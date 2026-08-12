import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProspectusView } from "@/components/prospectus-view";
import { readDb } from "@/lib/db";

export default async function HomePage() {
  const db = await readDb();
  const featured = db.prospectuses.find((item) => item.slug === "lumen-design-week") || db.prospectuses[0];
  const template = db.templates.find((item) => item.id === featured.templateId);

  return (
    <div>
      <SiteHeader />
      <section className="page pb-8 pt-16 md:pt-24">
        <p className="fade-up muted text-[13px] uppercase tracking-[0.22em]">Sponsorship, composed</p>
        <h1 className="display fade-up delay-1 mt-6 max-w-5xl text-[52px] md:text-[84px]">
          Make the case.
          <br />
          Quietly, completely.
        </h1>
        <p className="muted fade-up delay-2 mt-8 max-w-xl text-[18px] leading-8 md:text-[20px]">
          SponsorPortal is a studio for people who need a partner, not a pitch deck.
          Write a prospectus, refine it with a calm writing assistant, and place it
          where the right houses can find it.
        </p>
        <div className="fade-up delay-3 mt-10 flex flex-wrap gap-3">
          <Link href="/signup" className="btn">
            Begin a prospectus
          </Link>
          <Link href="/discover" className="btn btn-secondary">
            Browse as a sponsor
          </Link>
        </div>
      </section>

      <section className="page pb-24 pt-10">
        <div className="fade-up delay-4 origin-top scale-[0.98] md:scale-100">
          <ProspectusView prospectus={featured} template={template} compact />
        </div>
      </section>

      <section className="page grid gap-6 py-10 md:grid-cols-3">
        {[
          {
            title: "A guided room",
            body: "A seven-step wizard that asks only what a partner needs to know. Progress is visible. Drafts save themselves.",
          },
          {
            title: "A writer beside you",
            body: "Draft, tighten, or change the temperature of any passage. The assistant stays in the margin, never on the stage.",
          },
          {
            title: "A public invitation",
            body: "Export a quiet PDF, share a private link, or publish to Discover so sponsors can write back.",
          },
        ].map((item) => (
          <div key={item.title} className="surface p-8">
            <h2 className="display text-3xl">{item.title}</h2>
            <p className="muted mt-4 text-[15px] leading-7">{item.body}</p>
          </div>
        ))}
      </section>

      <section id="how" className="page py-24">
        <p className="muted text-[13px] uppercase tracking-[0.22em]">How it works</p>
        <h2 className="display mt-4 max-w-3xl text-5xl md:text-6xl">Three calm steps.</h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {[
            ["01", "Choose a template", "Editorial, summit, civic, festival, arena, or noir. Each one arrives with intelligent defaults."],
            ["02", "Write the case", "Foundation, story, audience, value, packages, invitation. Assist whenever a sentence stalls."],
            ["03", "Share the room", "Preview, export, publish. Sponsors browse, filter, and send a note — not a cold form."],
          ].map(([n, title, body]) => (
            <div key={n}>
              <p className="text-[13px] text-[var(--ink-soft)]">{n}</p>
              <h3 className="display mt-3 text-3xl">{title}</h3>
              <p className="muted mt-3 text-[15px] leading-7">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page py-10">
        <div className="surface overflow-hidden px-8 py-16 md:px-16">
          <p className="muted text-[13px] uppercase tracking-[0.22em]">For sponsors</p>
          <h2 className="display mt-4 max-w-3xl text-5xl">Find work worth underwriting.</h2>
          <p className="muted mt-6 max-w-xl text-[17px] leading-8">
            Discover is a reading room, not a marketplace shout. Filter by industry,
            audience, place, and partnership level. Open a prospectus. If it belongs
            on your calendar, write to the person who made it.
          </p>
          <Link href="/signup?role=sponsor" className="btn mt-8">
            Create a sponsor account
          </Link>
        </div>
      </section>

      <section className="page py-24 text-center">
        <h2 className="display mx-auto max-w-3xl text-5xl md:text-6xl">
          The prospectus should feel like the partnership.
        </h2>
        <p className="muted mx-auto mt-6 max-w-lg text-[17px] leading-8">
          Start from a template. Leave with a document you would be willing to send
          to someone you respect.
        </p>
        <Link href="/signup" className="btn mt-8">
          Open the studio
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
