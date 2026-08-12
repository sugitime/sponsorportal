import { AppFrame } from "@/components/app-frame";
import { readDb } from "@/lib/db";
import { formatCompactDate } from "@/lib/utils";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const db = await readDb();
  const stats = [
    { label: "Accounts", value: db.users.length },
    { label: "Published", value: db.prospectuses.filter((item) => item.status === "published").length },
    { label: "Drafts", value: db.prospectuses.filter((item) => item.status === "draft").length },
    { label: "Sponsor notes", value: db.interests.length },
  ];

  return (
    <AppFrame roles={["admin"]}>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">Overview</p>
      <h1 className="display mt-3 text-5xl">The house, at a glance.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="surface p-6">
            <p className="muted text-[13px]">{item.label}</p>
            <p className="display mt-3 text-5xl">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="surface p-6">
          <h2 className="display text-2xl">Recent accounts</h2>
          <ul className="mt-5 space-y-4">
            {[...db.users]
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(0, 6)
              .map((user) => (
                <li key={user.id} className="flex items-center justify-between text-[14px]">
                  <span>
                    {user.name}
                    <span className="muted"> · {user.role}</span>
                  </span>
                  <span className="muted">{formatCompactDate(user.createdAt)}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="surface p-6">
          <h2 className="display text-2xl">Recent interest</h2>
          <ul className="mt-5 space-y-4">
            {db.interests.slice(0, 6).map((item) => (
              <li key={item.id} className="text-[14px]">
                <p>
                  {item.sponsorName}
                  <span className="muted"> · {item.sponsorOrganization}</span>
                </p>
                <p className="muted mt-1 line-clamp-2">{item.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppFrame>
  );
}
