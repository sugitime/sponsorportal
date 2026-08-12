import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TemplateCard } from "@/components/template-card";
import { readDb } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "Templates" };

export default async function TemplatesPage() {
  const db = await readDb();
  return (
    <div>
      <SiteHeader />
      <section className="page py-16">
        <p className="muted text-[13px] uppercase tracking-[0.2em]">Templates</p>
        <h1 className="display mt-3 max-w-3xl text-5xl md:text-6xl">Six rooms. One standard.</h1>
        <p className="muted mt-5 max-w-xl text-[17px] leading-8">
          Each template is a complete visual system — paper, type, and a first draft of
          the language a partner expects to read.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {db.templates
            .filter((item) => item.active)
            .map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
        </div>
        <Link href="/signup" className="btn mt-12">
          Start from a template
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
