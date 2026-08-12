import { AppFrame } from "@/components/app-frame";
import { readDb } from "@/lib/db";
import { SettingsForm } from "./ui";

export const metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const db = await readDb();
  return (
    <AppFrame roles={["admin"]}>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">Settings</p>
      <h1 className="display mt-3 text-5xl">The house rules.</h1>
      <SettingsForm settings={db.settings} />
    </AppFrame>
  );
}
