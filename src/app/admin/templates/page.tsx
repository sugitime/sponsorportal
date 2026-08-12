import { AppFrame } from "@/components/app-frame";
import { readDb } from "@/lib/db";
import { TemplateEditor } from "./ui";

export const metadata = { title: "Templates" };

export default async function AdminTemplatesPage() {
  const db = await readDb();
  return (
    <AppFrame roles={["admin"]}>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">Templates</p>
      <h1 className="display mt-3 text-5xl">The rooms.</h1>
      <TemplateEditor templates={db.templates} />
    </AppFrame>
  );
}
