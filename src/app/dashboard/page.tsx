import Link from "next/link";
import { AppFrame } from "@/components/app-frame";
import { EmptyState } from "@/components/empty-state";
import { requireUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { completionScore, formatCompactDate } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Studio" };

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/login");
  if (user.role === "sponsor") redirect("/discover");
  if (user.role === "admin") redirect("/admin");

  const db = await readDb();
  const mine = db.prospectuses.filter((item) => item.ownerId === user.id);
  const notes = db.interests.filter((item) => mine.some((entry) => entry.id === item.prospectusId));

  return (
    <AppFrame roles={["prospect"]}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="muted text-[13px] uppercase tracking-[0.2em]">Studio</p>
          <h1 className="display mt-3 text-5xl">Good morning, {user.name.split(" ")[0]}.</h1>
          <p className="muted mt-3 max-w-xl text-[16px] leading-7">
            {mine.length
              ? `${mine.length} prospectus${mine.length === 1 ? "" : "es"} in the room. ${notes.length} notes from sponsors.`
              : "The desk is clear. Begin with a template."}
          </p>
        </div>
        <Link href="/create" className="btn">
          New prospectus
        </Link>
      </div>

      {mine.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="Nothing drafted yet"
            body="Choose a template. The wizard will walk you from the first sentence to a public invitation."
            action="Choose a template"
            href="/create"
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-4">
          {mine.map((item) => {
            const score = completionScore(item);
            return (
              <div key={item.id} className="surface flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className={`text-[12px] uppercase tracking-[0.16em] status-${item.status}`}>
                    {item.status}
                  </p>
                  <h2 className="display mt-2 text-3xl">{item.title || "Untitled"}</h2>
                  <p className="muted mt-2 text-[14px]">
                    Updated {formatCompactDate(item.updatedAt)} · {score}% complete
                  </p>
                  <div className="progress mt-4 w-48">
                    <span style={{ width: `${score}%` }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/prospectus/${item.id}/edit`} className="btn btn-secondary">
                    Continue
                  </Link>
                  <Link href={`/prospectus/${item.id}`} className="btn-ghost">
                    Preview
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppFrame>
  );
}
