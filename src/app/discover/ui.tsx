"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AUDIENCE_SIZES, INDUSTRIES, PACKAGE_LEVELS, type Prospectus, type Template } from "@/lib/types";
import { EmptyState } from "@/components/empty-state";

type Card = Prospectus & { template?: Template; interestCount: number };

export function DiscoverBoard({ role }: { role: string }) {
  const [items, setItems] = useState<Card[]>([]);
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (industry) params.set("industry", industry);
    if (audience) params.set("audience", audience);
    if (location) params.set("location", location);
    if (level) params.set("level", level);
    fetch(`/api/discover?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.prospectuses || []);
        setLoaded(true);
      });
  }, [q, industry, audience, location, level]);

  const cities = useMemo(
    () => Array.from(new Set(items.map((item) => item.location).filter(Boolean))).slice(0, 8),
    [items],
  );

  return (
    <div>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">Discover</p>
      <h1 className="display mt-3 text-5xl md:text-6xl">Work worth underwriting.</h1>
      <p className="muted mt-4 max-w-xl text-[16px] leading-7">
        Published prospectuses, arranged for reading. Filter until the room feels right.
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
        <input
          className="input"
          placeholder="Search a city, a sport, a summit…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">All industries</option>
          {INDUSTRIES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="select" value={audience} onChange={(e) => setAudience(e.target.value)}>
          <option value="">Any audience</option>
          {AUDIENCE_SIZES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <select className="select max-w-[220px]" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Any partnership level</option>
          {PACKAGE_LEVELS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <input
          className="input max-w-[220px]"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {cities.map((city) => (
          <button key={city} type="button" className="chip" onClick={() => setLocation(city)}>
            {city}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <Link key={item.id} href={`/p/${item.slug}`} className="surface block p-7 transition-transform hover:scale-[1.01]">
            <div
              className="mb-6 h-2 rounded-full"
              style={{ background: item.template?.accent || "#1d1d1f" }}
            />
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {item.industry} · {item.location}
            </p>
            <h2 className="display mt-3 text-3xl">{item.title}</h2>
            <p className="muted mt-3 text-[15px] leading-7">{item.tagline}</p>
            <div className="muted mt-6 flex flex-wrap gap-4 text-[13px]">
              <span>{item.audienceSize}</span>
              <span>{item.packages.filter((pkg) => pkg.name).length} packages</span>
              {role !== "guest" && <span>{item.interestCount} notes</span>}
            </div>
          </Link>
        ))}
      </div>
      {loaded && items.length === 0 && (
        <div className="mt-10">
          <EmptyState
            title="Nothing in this frame"
            body="Widen the filters. The room may simply be elsewhere."
          />
        </div>
      )}
    </div>
  );
}
