"use client";

import { useRouter } from "next/navigation";
import type { Role, User } from "@/lib/types";
import { formatCompactDate } from "@/lib/utils";

export function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();

  async function patch(id: string, body: { role?: Role; active?: boolean }) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.refresh();
  }

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-[14px]">
        <thead className="text-[12px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
          <tr>
            <th className="pb-4 font-normal">Name</th>
            <th className="pb-4 font-normal">Role</th>
            <th className="pb-4 font-normal">Joined</th>
            <th className="pb-4 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-[var(--line)]">
              <td className="py-4">
                <p>{user.name}</p>
                <p className="muted text-[13px]">{user.email}</p>
              </td>
              <td className="py-4">
                <select
                  className="select max-w-[140px]"
                  value={user.role}
                  onChange={(e) => patch(user.id, { role: e.target.value as Role })}
                >
                  <option value="prospect">Creator</option>
                  <option value="sponsor">Sponsor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="muted py-4">{formatCompactDate(user.createdAt)}</td>
              <td className="py-4">
                <button
                  type="button"
                  className="btn-ghost btn-sm"
                  onClick={() => patch(user.id, { active: !user.active })}
                >
                  {user.active ? "Deactivate" : "Restore"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
