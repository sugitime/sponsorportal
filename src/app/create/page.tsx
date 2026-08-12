import { AppFrame } from "@/components/app-frame";
import { readDb } from "@/lib/db";
import { CreateStudio } from "./ui";

export const metadata = { title: "New prospectus" };

export default async function CreatePage() {
  const db = await readDb();
  return (
    <AppFrame roles={["prospect", "admin"]}>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">New prospectus</p>
      <h1 className="display mt-3 text-5xl">Choose a room.</h1>
      <p className="muted mt-4 max-w-xl text-[16px] leading-7">
        Each template arrives with a tone, a paper, and sentences you can keep or discard.
      </p>
      <CreateStudio templates={db.templates.filter((item) => item.active)} />
    </AppFrame>
  );
}
