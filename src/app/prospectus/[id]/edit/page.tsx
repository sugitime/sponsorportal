import { notFound, redirect } from "next/navigation";
import { AppFrame } from "@/components/app-frame";
import { requireUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { Wizard } from "./wizard";

export const metadata = { title: "Edit prospectus" };

export default async function EditProspectusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser(["prospect", "admin"]);
  if (!user) redirect("/login");
  const { id } = await params;
  const db = await readDb();
  const prospectus = db.prospectuses.find((item) => item.id === id);
  if (!prospectus || (user.role !== "admin" && prospectus.ownerId !== user.id)) notFound();
  const template = db.templates.find((item) => item.id === prospectus.templateId);

  return (
    <AppFrame roles={["prospect", "admin"]}>
      <Wizard initial={prospectus} templateName={template?.name || "Custom"} />
    </AppFrame>
  );
}
