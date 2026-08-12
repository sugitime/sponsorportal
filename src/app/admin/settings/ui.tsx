"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState("");

  return (
    <form
      className="mt-10 max-w-xl space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setStatus("Saved.");
      }}
    >
      <label className="field">
        <span className="field-label">Site name</span>
        <input
          className="input"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">Tagline</span>
        <input
          className="input"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">Support email</span>
        <input
          className="input"
          value={form.supportEmail}
          onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
        />
      </label>
      <label className="flex items-center gap-3 text-[14px]">
        <input
          type="checkbox"
          checked={form.allowPublicSignup}
          onChange={(e) => setForm({ ...form, allowPublicSignup: e.target.checked })}
        />
        Allow public sign-up
      </label>
      <label className="flex items-center gap-3 text-[14px]">
        <input
          type="checkbox"
          checked={form.requireModeration}
          onChange={(e) => setForm({ ...form, requireModeration: e.target.checked })}
        />
        Require moderation before publishing
      </label>
      <button className="btn">Save settings</button>
      {status && <p className="text-[14px]">{status}</p>}
    </form>
  );
}
