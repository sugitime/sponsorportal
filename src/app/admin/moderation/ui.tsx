"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Prospectus, ProspectusStatus } from "@/lib/types";

export function ModerationBoard({
  items,
}: {
  items: (Prospectus & { ownerName: string })[];
}) {
  const router = useRouter();

  async function setStatus(id: string, status: ProspectusStatus) {
    await fetch("/api/admin/moderation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  }

  return (
    <div className="mt-10 space-y-4">
      {items.map((item) => (
        <article key={item.id} className="surface flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={`text-[12px] uppercase tracking-[0.16em] status-${item.status}`}>{item.status}</p>
            <h2 className="display mt-2 text-2xl">{item.title}</h2>
            <p className="muted mt-1 text-[13px]">
              {item.ownerName} · {item.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/prospectus/${item.id}`} className="btn-ghost btn-sm">
              Preview
            </Link>
            {item.status !== "published" && (
              <button type="button" className="btn btn-sm" onClick={() => setStatus(item.id, "published")}>
                Publish
              </button>
            )}
            {item.status === "published" && (
              <button type="button" className="btn-ghost btn-sm" onClick={() => setStatus(item.id, "archived")}>
                Archive
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
