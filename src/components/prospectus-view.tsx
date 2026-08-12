import type { Prospectus, Template, TemplateTone } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const themes: Record<
  TemplateTone,
  { paper: string; ink: string; muted: string; accent: string; display: string }
> = {
  editorial: {
    paper: "#f4efe6",
    ink: "#2a2118",
    muted: "#7a6a58",
    accent: "#8a5a2b",
    display: "serif",
  },
  summit: {
    paper: "#eef2f5",
    ink: "#14202b",
    muted: "#5c6b78",
    accent: "#1c3d5a",
    display: "display",
  },
  festival: {
    paper: "#fff6ea",
    ink: "#3a2416",
    muted: "#8a6750",
    accent: "#c45c26",
    display: "serif",
  },
  civic: {
    paper: "#f3f4f1",
    ink: "#1c2420",
    muted: "#667068",
    accent: "#2f4f4f",
    display: "display",
  },
  arena: {
    paper: "#eef3ef",
    ink: "#12221b",
    muted: "#5d7267",
    accent: "#16382b",
    display: "display",
  },
  noir: {
    paper: "#161616",
    ink: "#f3ecdc",
    muted: "#b2a790",
    accent: "#c9b37a",
    display: "serif",
  },
};

export function ProspectusView({
  prospectus,
  template,
  compact = false,
}: {
  prospectus: Prospectus;
  template?: Template;
  compact?: boolean;
}) {
  const tone = template?.tone || "editorial";
  const theme = themes[tone];

  return (
    <article
      className="print-sheet overflow-hidden rounded-[28px] shadow-[var(--shadow)]"
      style={{
        background: theme.paper,
        color: theme.ink,
        ["--paper" as string]: theme.paper,
      }}
    >
      <div className={compact ? "px-8 py-10 md:px-12 md:py-12" : "px-8 py-14 md:px-16 md:py-20"}>
        <p
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: theme.accent }}
        >
          {prospectus.organization || "Sponsorship prospectus"}
        </p>
        <h1
          className={`${theme.display} mt-5 ${compact ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl"}`}
        >
          {prospectus.title || "Untitled prospectus"}
        </h1>
        {prospectus.tagline && (
          <p
            className={`${theme.display === "serif" ? "serif" : ""} mt-6 max-w-2xl text-xl leading-8 md:text-2xl md:leading-10`}
            style={{ color: theme.muted }}
          >
            {prospectus.tagline}
          </p>
        )}
        <div
          className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[13px]"
          style={{ color: theme.muted }}
        >
          {prospectus.location && <span>{prospectus.location}</span>}
          {prospectus.eventDate && <span>{formatDate(prospectus.eventDate)}</span>}
          {prospectus.audienceSize && <span>{prospectus.audienceSize} guests</span>}
          {prospectus.industry && <span>{prospectus.industry}</span>}
        </div>
      </div>

      {!compact && (
        <>
          <Section title="The gathering" theme={theme} body={prospectus.overview} />
          <Section title="Who is in the room" theme={theme} body={prospectus.audience} />
          <Section title="The numbers" theme={theme} body={prospectus.demographics} />
          <Section title="Why partner" theme={theme} body={prospectus.benefits} />

          {prospectus.packages.some((item) => item.name) && (
            <div className="px-8 pb-6 md:px-16">
              <p
                className="text-[12px] uppercase tracking-[0.18em]"
                style={{ color: theme.accent }}
              >
                Partnerships
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {prospectus.packages
                  .filter((item) => item.name)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl p-5"
                      style={{
                        border: `1px solid ${theme.ink}18`,
                        background: `${theme.ink}08`,
                      }}
                    >
                      <p className="text-[12px] uppercase tracking-[0.16em]" style={{ color: theme.muted }}>
                        {item.level}
                      </p>
                      <h3 className={`${theme.display} mt-3 text-2xl`}>{item.name}</h3>
                      <p className="mt-2 text-lg" style={{ color: theme.accent }}>
                        {item.price || "By conversation"}
                      </p>
                      <ul className="mt-4 space-y-2 text-[14px] leading-6" style={{ color: theme.muted }}>
                        {item.benefits.filter(Boolean).map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Section title="An invitation" theme={theme} body={prospectus.callToAction} last />
          {(prospectus.contactName || prospectus.contactEmail) && (
            <div className="px-8 pb-16 md:px-16" style={{ color: theme.muted }}>
              <p className="text-[15px]">{prospectus.contactName}</p>
              <p className="text-[14px]">{prospectus.contactEmail}</p>
            </div>
          )}
        </>
      )}
    </article>
  );
}

function Section({
  title,
  body,
  theme,
  last = false,
}: {
  title: string;
  body: string;
  theme: (typeof themes)[TemplateTone];
  last?: boolean;
}) {
  if (!body) return null;
  return (
    <div className={`px-8 md:px-16 ${last ? "pb-8" : "pb-12"}`}>
      <p className="text-[12px] uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
        {title}
      </p>
      <p
        className={`${theme.display === "serif" ? "serif" : ""} mt-4 max-w-3xl text-[18px] leading-8 md:text-[20px] md:leading-9`}
      >
        {body}
      </p>
    </div>
  );
}
