import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AppFrame } from "@/components/app-frame";
import { ProspectusView } from "@/components/prospectus-view";
import { requireUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { PreviewActions } from "./actions";

export const metadata = { title: "Preview" };

export default async function ProspectusPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  if (!user) redirect("/login");
  const { id } = await params;
  const db = await readDb();
  const prospectus = db.prospectuses.find((item) => item.id === id);
  if (!prospectus || (user.role !== "admin" && prospectus.ownerId !== user.id)) notFound();
  const template = db.templates.find((item) => item.id === prospectus.templateId);

  return (
    <AppFrame>
      <div className="no-print mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`text-[13px] uppercase tracking-[0.2em] status-${prospectus.status}`}>
            {prospectus.status}
          </p>
          <h1 className="display mt-2 text-4xl">Preview</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/prospectus/${prospectus.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <PreviewActions id={prospectus.id} slug={prospectus.slug} status={prospectus.status} />
        </div>
      </div>
      <ProspectusView prospectus={prospectus} template={template} />
    </AppFrame>
  );
}
