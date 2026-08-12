"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateCard } from "@/components/template-card";
import { api } from "@/lib/api";
import type { Prospectus, Template } from "@/lib/types";

export function CreateStudio({ templates }: { templates: Template[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState(templates[0]?.id || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function begin() {
    setBusy(true);
    setError("");
    try {
      const result = await api<{ prospectus: Prospectus }>("/api/prospectuses", {
        method: "POST",
        body: JSON.stringify({ templateId: selected }),
      });
      router.push(`/prospectus/${result.prospectus.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start.");
      setBusy(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="grid gap-5 md:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={selected === template.id}
            onSelect={() => setSelected(template.id)}
          />
        ))}
      </div>
      {error && <p className="mt-6 text-[14px] text-[#b42318]">{error}</p>}
      <button className="btn mt-8" onClick={begin} disabled={!selected || busy}>
        {busy ? "Opening…" : "Begin with this template"}
      </button>
    </div>
  );
}
