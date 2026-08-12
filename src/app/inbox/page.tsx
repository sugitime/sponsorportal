import Link from "next/link";
import { AppFrame } from "@/components/app-frame";
import { EmptyState } from "@/components/empty-state";
import { requireUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { formatCompactDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ReviewNote } from "./ui";

export const metadata = { title: "Interest" };

export default async function InboxPage() {
  const user = await requireUser();
  if (!user) redirect("/login");
  const db = await readDb();

  const interests =
    user.role === "sponsor"
      ? db.interests.filter((item) => item.sponsorId === user.id)
      : db.interests.filter((item) => {
          const prospectus = db.prospectuses.find((entry) => entry.id === item.prospectusId);
          return prospectus && (prospectus.ownerId === user.id || user.role === "admin");
        });

  return (
    <AppFrame>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">
        {user.role === "sponsor" ? "Sent" : "Interest"}
      </p>
      <h1 className="display mt-3 text-5xl">
        {user.role === "sponsor" ? "Notes you have sent." : "People who wrote back."}
      </h1>
      {interests.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title={user.role === "sponsor" ? "No notes yet" : "The tray is empty"}
            body={
              user.role === "sponsor"
                ? "Open a published prospectus and send a short, specific note."
                : "When a sponsor writes, the note will wait here."
            }
            action={user.role === "sponsor" ? "Open Discover" : undefined}
            href={user.role === "sponsor" ? "/discover" : undefined}
          />
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {interests.map((item) => {
            const prospectus = db.prospectuses.find((entry) => entry.id === item.prospectusId);
            return (
              <article key={item.id} className="surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                      {item.status} · {formatCompactDate(item.createdAt)}
                    </p>
                    <h2 className="display mt-2 text-3xl">{prospectus?.title || "Prospectus"}</h2>
                    <p className="muted mt-2 text-[14px]">
                      {item.sponsorName}
                      {item.sponsorOrganization ? ` · ${item.sponsorOrganization}` : ""}
                    </p>
                  </div>
                  {prospectus && (
                    <Link href={`/p/${prospectus.slug}`} className="btn-ghost btn-sm">
                      Open
                    </Link>
                  )}
                </div>
                <p className="mt-5 max-w-2xl text-[16px] leading-7">{item.message}</p>
                {user.role !== "sponsor" && item.status === "new" && <ReviewNote id={item.id} />}
                {user.role === "sponsor" && (
                  <p className="muted mt-4 text-[13px]">{item.sponsorEmail}</p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </AppFrame>
  );
}
