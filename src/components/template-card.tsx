import type { Template } from "@/lib/types";

export function TemplateCard({
  template,
  selected = false,
  onSelect,
}: {
  template: Template;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const body = (
    <>
      <div
        className="h-36 rounded-[18px]"
        style={{
          background: `linear-gradient(160deg, ${template.paper} 0%, ${template.accent}55 100%)`,
        }}
      />
      <div className="mt-4">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
          {template.category}
        </p>
        <h3 className="display mt-1 text-2xl">{template.name}</h3>
        <p className="muted mt-2 text-[14px] leading-6">{template.description}</p>
      </div>
    </>
  );

  if (!onSelect) {
    return <div className="surface p-4">{body}</div>;
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`surface w-full p-4 text-left transition-transform hover:scale-[1.01] ${
        selected ? "ring-2 ring-[var(--ink)]" : ""
      }`}
    >
      {body}
    </button>
  );
}
