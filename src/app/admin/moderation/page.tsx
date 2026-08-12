import { AppFrame } from "@/components/app-frame";
import { readDb } from "@/lib/db";
import { ModerationBoard } from "./ui";

export const metadata = { title: "Moderation" };

export default async function AdminModerationPage() {
  const db = await readDb();
  return (
    <AppFrame roles={["admin"]}>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">Moderation</p>
      <h1 className="display mt-3 text-5xl">Published work.</h1>
      <ModerationBoard
        items={db.prospectuses.map((item) => ({
          ...item,
          ownerName: db.users.find((user) => user.id === item.ownerId)?.name || "Unknown",
        }))}
      />
    </AppFrame>
  );
}
