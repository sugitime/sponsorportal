"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiAssist } from "@/components/ai-assist";
import { api } from "@/lib/api";
import {
  AUDIENCE_SIZES,
  INDUSTRIES,
  PACKAGE_LEVELS,
  type Prospectus,
  type SponsorshipPackage,
} from "@/lib/types";
import { completionScore } from "@/lib/utils";

const steps = [
  { id: "foundation", title: "Foundation", hint: "Name the gathering." },
  { id: "story", title: "Story", hint: "What is being offered, and why now." },
  { id: "audience", title: "Audience", hint: "Who will be in the room." },
  { id: "value", title: "Value", hint: "Why a house should stand beside you." },
  { id: "packages", title: "Packages", hint: "The shapes a partnership can take." },
  { id: "invite", title: "Invitation", hint: "How they write back." },
  { id: "review", title: "Review", hint: "Save, share, or publish." },
] as const;

export function Wizard({ initial, templateName }: { initial: Prospectus; templateName: string }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState("Saved");
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);

  const score = completionScore(data);
  const context = useMemo(
    () =>
      [
        `Title: ${data.title}`,
        `Organization: ${data.organization}`,
        `Industry: ${data.industry}`,
        `Location: ${data.location}`,
        `Date: ${data.eventDate}`,
        `Audience size: ${data.audienceSize}`,
        `Tagline: ${data.tagline}`,
      ].join("\n"),
    [data],
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      setSaved("Saving…");
      api(`/api/prospectuses/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then(() => setSaved("Saved"))
        .catch(() => setSaved("Couldn’t save"));
    }, 700);
    return () => clearTimeout(handle);
  }, [data]);

  function patch<K extends keyof Prospectus>(key: K, value: Prospectus[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updatePackage(id: string, next: Partial<SponsorshipPackage>) {
    patch(
      "packages",
      data.packages.map((item) => (item.id === id ? { ...item, ...next } : item)),
    );
  }

  async function publish() {
    setPublishing(true);
    setError("");
    try {
      await api(`/api/prospectuses/${data.id}`, { method: "PATCH", body: JSON.stringify(data) });
      const result = await api<{ prospectus: Prospectus }>(`/api/prospectuses/${data.id}/publish`, {
        method: "POST",
      });
      setData(result.prospectus);
      router.push(`/prospectus/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to publish.");
      setPublishing(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="muted text-[13px] uppercase tracking-[0.2em]">{templateName}</p>
          <h1 className="display mt-2 text-4xl md:text-5xl">{data.title || "Untitled prospectus"}</h1>
        </div>
        <div className="muted text-[13px]">
          {saved} · {score}% complete
        </div>
      </div>

      <div className="mt-8 hidden gap-2 md:flex">
        {steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStep(index)}
            className={`h-1 flex-1 rounded-full ${index <= step ? "bg-[var(--ink)]" : "bg-[var(--line)]"}`}
            aria-label={item.title}
          />
        ))}
      </div>
      <div className="progress mt-8 md:hidden">
        <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <ol className="space-y-4">
            {steps.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setStep(index)}
                  className={`text-left ${index === step ? "" : "text-[var(--ink-soft)]"}`}
                >
                  <span className="block text-[12px] uppercase tracking-[0.16em]">0{index + 1}</span>
                  <span className="display mt-1 block text-xl">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <section className="surface p-6 md:p-10">
          <p className="muted text-[13px] uppercase tracking-[0.18em]">
            Step {step + 1} of {steps.length}
          </p>
          <h2 className="display mt-2 text-4xl">{steps[step].title}</h2>
          <p className="muted mt-2 text-[15px]">{steps[step].hint}</p>

          <div className="mt-8 space-y-6">
            {step === 0 && (
              <>
                <Field label="Title">
                  <input className="input" value={data.title} onChange={(e) => patch("title", e.target.value)} />
                </Field>
                <Field label="Tagline">
                  <input className="input" value={data.tagline} onChange={(e) => patch("tagline", e.target.value)} />
                  <AiAssist
                    section="tagline"
                    value={data.tagline}
                    context={context}
                    onApply={(text) => patch("tagline", text)}
                  />
                </Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Organization">
                    <input
                      className="input"
                      value={data.organization}
                      onChange={(e) => patch("organization", e.target.value)}
                    />
                  </Field>
                  <Field label="Industry">
                    <select
                      className="select"
                      value={data.industry}
                      onChange={(e) => patch("industry", e.target.value)}
                    >
                      <option value="">Select</option>
                      {INDUSTRIES.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Location">
                    <input
                      className="input"
                      value={data.location}
                      onChange={(e) => patch("location", e.target.value)}
                    />
                  </Field>
                  <Field label="Date">
                    <input
                      className="input"
                      type="date"
                      value={data.eventDate}
                      onChange={(e) => patch("eventDate", e.target.value)}
                    />
                  </Field>
                  <Field label="Audience size">
                    <select
                      className="select"
                      value={data.audienceSize}
                      onChange={(e) => patch("audienceSize", e.target.value)}
                    >
                      <option value="">Select</option>
                      {AUDIENCE_SIZES.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </>
            )}

            {step === 1 && (
              <Field label="Overview">
                <textarea
                  className="textarea min-h-[220px]"
                  value={data.overview}
                  onChange={(e) => patch("overview", e.target.value)}
                />
                <AiAssist
                  section="overview"
                  value={data.overview}
                  context={context}
                  onApply={(text) => patch("overview", text)}
                />
              </Field>
            )}

            {step === 2 && (
              <>
                <Field label="Who is in the room">
                  <textarea
                    className="textarea"
                    value={data.audience}
                    onChange={(e) => patch("audience", e.target.value)}
                  />
                  <AiAssist
                    section="audience"
                    value={data.audience}
                    context={context}
                    onApply={(text) => patch("audience", text)}
                  />
                </Field>
                <Field label="Demographics">
                  <textarea
                    className="textarea"
                    value={data.demographics}
                    onChange={(e) => patch("demographics", e.target.value)}
                  />
                  <AiAssist
                    section="demographics"
                    value={data.demographics}
                    context={`${context}\nAudience: ${data.audience}`}
                    onApply={(text) => patch("demographics", text)}
                  />
                </Field>
              </>
            )}

            {step === 3 && (
              <Field label="Why partner">
                <textarea
                  className="textarea min-h-[220px]"
                  value={data.benefits}
                  onChange={(e) => patch("benefits", e.target.value)}
                />
                <AiAssist
                  section="benefits"
                  value={data.benefits}
                  context={context}
                  onApply={(text) => patch("benefits", text)}
                />
              </Field>
            )}

            {step === 4 && (
              <div className="space-y-5">
                {data.packages.map((item, index) => (
                  <div key={item.id} className="rounded-2xl border border-[var(--line)] p-5">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Field label={`Package ${index + 1}`}>
                        <input
                          className="input"
                          value={item.name}
                          onChange={(e) => updatePackage(item.id, { name: e.target.value })}
                        />
                      </Field>
                      <Field label="Investment">
                        <input
                          className="input"
                          value={item.price}
                          onChange={(e) => updatePackage(item.id, { price: e.target.value })}
                        />
                      </Field>
                      <Field label="Level">
                        <select
                          className="select"
                          value={item.level}
                          onChange={(e) =>
                            updatePackage(item.id, {
                              level: e.target.value as SponsorshipPackage["level"],
                            })
                          }
                        >
                          {PACKAGE_LEVELS.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="Benefits, one per line">
                      <textarea
                        className="textarea min-h-[120px]"
                        value={item.benefits.join("\n")}
                        onChange={(e) =>
                          updatePackage(item.id, {
                            benefits: e.target.value.split("\n"),
                          })
                        }
                      />
                    </Field>
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={() => patch("packages", data.packages.filter((entry) => entry.id !== item.id))}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    patch("packages", [
                      ...data.packages,
                      {
                        id: crypto.randomUUID(),
                        name: "",
                        price: "",
                        level: "custom",
                        benefits: [""],
                      },
                    ])
                  }
                >
                  Add a package
                </button>
              </div>
            )}

            {step === 5 && (
              <>
                <Field label="Call to action">
                  <textarea
                    className="textarea"
                    value={data.callToAction}
                    onChange={(e) => patch("callToAction", e.target.value)}
                  />
                  <AiAssist
                    section="callToAction"
                    value={data.callToAction}
                    context={context}
                    onApply={(text) => patch("callToAction", text)}
                  />
                </Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Contact name">
                    <input
                      className="input"
                      value={data.contactName}
                      onChange={(e) => patch("contactName", e.target.value)}
                    />
                  </Field>
                  <Field label="Contact email">
                    <input
                      className="input"
                      type="email"
                      value={data.contactEmail}
                      onChange={(e) => patch("contactEmail", e.target.value)}
                    />
                  </Field>
                </div>
              </>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <p className="text-[16px] leading-7">
                  This prospectus is {score}% complete. Preview it, print a PDF, share the
                  public link once published, or return to any section.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/prospectus/${data.id}`} className="btn btn-secondary">
                    Open preview
                  </Link>
                  <button type="button" className="btn" onClick={publish} disabled={publishing}>
                    {publishing
                      ? "Working…"
                      : data.status === "published"
                        ? "Unpublish"
                        : "Publish to Discover"}
                  </button>
                </div>
                {data.status === "published" && (
                  <p className="muted text-[14px]">
                    Live at <Link href={`/p/${data.slug}`}>/p/{data.slug}</Link>
                  </p>
                )}
                {data.status === "pending" && (
                  <p className="muted text-[14px]">Awaiting moderation before it appears in Discover.</p>
                )}
              </div>
            )}
          </div>

          {error && <p className="mt-6 text-[14px] text-[#b42318]">{error}</p>}

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button type="button" className="btn" onClick={() => setStep((value) => value + 1)}>
                Continue
              </button>
            ) : (
              <Link href={`/prospectus/${data.id}`} className="btn">
                Finish
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      {children}
    </div>
  );
}
