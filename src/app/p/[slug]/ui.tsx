"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export function PublicActions() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="no-print flex flex-wrap gap-2">
      <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
        Export PDF
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? "Copied" : "Copy public link"}
      </button>
    </div>
  );
}

export function InterestForm({ prospectusId }: { prospectusId: string }) {
  const [message, setMessage] = useState(
    "We would like to learn more about a partnership. The work belongs on our calendar.",
  );
  const [status, setStatus] = useState<"idle" | "busy" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("busy");
    setError("");
    try {
      await api("/api/interests", {
        method: "POST",
        body: JSON.stringify({ prospectusId, message }),
      });
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send the note.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="surface p-8">
        <h2 className="display text-3xl">Note sent.</h2>
        <p className="muted mt-3 text-[15px] leading-7">
          The creator will see this in their studio. Nothing else is required of you today.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="surface p-8">
      <h2 className="display text-3xl">Express interest</h2>
      <p className="muted mt-3 max-w-lg text-[15px] leading-7">
        A short, specific note. Say which package, or simply that you would like a conversation.
      </p>
      <textarea className="textarea mt-6" value={message} onChange={(e) => setMessage(e.target.value)} />
      {error && <p className="mt-3 text-[14px] text-[#b42318]">{error}</p>}
      <button className="btn mt-5" disabled={status === "busy"}>
        {status === "busy" ? "Sending…" : "Send note"}
      </button>
    </form>
  );
}
