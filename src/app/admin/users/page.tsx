import { AppFrame } from "@/components/app-frame";
import { readDb } from "@/lib/db";
import { UsersTable } from "./ui";

export const metadata = { title: "People" };

export default async function AdminUsersPage() {
  const db = await readDb();
  return (
    <AppFrame roles={["admin"]}>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">People</p>
      <h1 className="display mt-3 text-5xl">Accounts.</h1>
      <UsersTable users={db.users} />
    </AppFrame>
  );
}
