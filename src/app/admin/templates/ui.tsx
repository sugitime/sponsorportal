"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Template } from "@/lib/types";

export function TemplateEditor({ templates }: { templates: Template[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function save(id: string, body: Partial<Template>) {
    await fetch(`/api/admin/templates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.refresh();
  }

  return (
    <div className="mt-10 space-y-5">
      {templates.map((template) => (
        <article key={template.id} className="surface p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                {template.category} · {template.tone}
              </p>
              <input
                className="display mt-2 w-full bg-transparent text-3xl outline-none"
                defaultValue={template.name}
                onBlur={(e) => save(template.id, { name: e.target.value })}
              />
              <textarea
                className="muted mt-3 w-full resize-none bg-transparent text-[14px] leading-6 outline-none"
                defaultValue={template.description}
                rows={2}
                onBlur={(e) => save(template.id, { description: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="btn-ghost btn-sm"
              onClick={() => save(template.id, { active: !template.active })}
            >
              {template.active ? "Retire" : "Restore"}
            </button>
          </div>
        </article>
      ))}

      <form
        className="surface p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          await fetch("/api/admin/templates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
          });
          setName("");
          setDescription("");
          router.refresh();
        }}
      >
        <h2 className="display text-2xl">New template</h2>
        <input
          className="input mt-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="textarea mt-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn mt-4">Create</button>
      </form>
    </div>
  );
}
