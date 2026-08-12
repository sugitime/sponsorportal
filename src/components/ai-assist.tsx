"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { AiAction, AiSection } from "@/lib/types";
import { api } from "@/lib/api";

const actions: { id: AiAction; label: string }[] = [
  { id: "draft", label: "Draft" },
  { id: "rewrite", label: "Rewrite" },
  { id: "shorten", label: "Shorten" },
  { id: "expand", label: "Expand" },
  { id: "professional", label: "Calm" },
  { id: "warm", label: "Warm" },
  { id: "bold", label: "Bold" },
  { id: "concise", label: "Tight" },
];

export function AiAssist({
  section,
  value,
  context,
  onApply,
}: {
  section: AiSection;
  value: string;
  context: string;
  onApply: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<AiAction | null>(null);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");
  const [provider, setProvider] = useState("");

  async function run(action: AiAction) {
    setBusy(action);
    setError("");
    try {
      const result = await api<{ text: string; provider: string }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          action,
          section,
          text: value,
          context,
          tone: action,
        }),
      });
      setSuggestion(result.text);
      setProvider(result.provider === "demo" ? "Studio draft" : "Writing assistant");
      setOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The assistant is unavailable.");
      setOpen(true);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-1">
        <span className="mr-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
          <Sparkles size={11} />
          Assist
        </span>
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="btn-ghost btn-sm h-8 px-2 text-[12px]"
            disabled={!!busy}
            onClick={() => run(action.id)}
          >
            {busy === action.id ? "…" : action.label}
          </button>
        ))}
      </div>
      {open && (suggestion || error) && (
        <div className="surface mt-3 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            {error ? "Unavailable" : provider}
          </p>
          <p className="mt-2 text-[14px] leading-6">{error || suggestion}</p>
          {!error && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  onApply(suggestion);
                  setOpen(false);
                }}
              >
                Use this
              </button>
              <button type="button" className="btn-ghost btn-sm" onClick={() => setOpen(false)}>
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
