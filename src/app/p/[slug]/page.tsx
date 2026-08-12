import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProspectusView } from "@/components/prospectus-view";
import { readDb } from "@/lib/db";
import { readSession } from "@/lib/auth";
import { InterestForm, PublicActions } from "./ui";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await readDb();
  const item = db.prospectuses.find((entry) => entry.slug === slug && entry.status === "published");
  return { title: item?.title || "Prospectus" };
}

export default async function PublicProspectusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await readDb();
  const prospectus = db.prospectuses.find((item) => item.slug === slug && item.status === "published");
  if (!prospectus) notFound();
  const template = db.templates.find((item) => item.id === prospectus.templateId);
  const session = await readSession();

  return (
    <div>
      <div className="no-print">
        <SiteHeader />
      </div>
      <section className="page flex flex-wrap items-end justify-between gap-4 py-10">
        <div>
          <p className="muted text-[13px] uppercase tracking-[0.2em]">Public prospectus</p>
          <h1 className="display mt-3 text-4xl">{prospectus.organization}</h1>
        </div>
        <PublicActions />
      </section>
      <section className="page pb-16">
        <ProspectusView prospectus={prospectus} template={template} />
        <div className="no-print mt-10">
          {session?.role === "sponsor" || session?.role === "admin" ? (
            <InterestForm prospectusId={prospectus.id} />
          ) : (
            <div className="surface p-8">
              <h2 className="display text-3xl">Write to the creator</h2>
              <p className="muted mt-3 max-w-lg text-[15px] leading-7">
                Sponsors can send a private note from here. Create a sponsor account
                to continue.
              </p>
              <Link href="/signup?role=sponsor" className="btn mt-6">
                Continue as a sponsor
              </Link>
            </div>
          )}
        </div>
      </section>
      <div className="no-print">
        <SiteFooter />
      </div>
    </div>
  );
}


