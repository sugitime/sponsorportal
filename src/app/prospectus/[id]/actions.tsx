"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Prospectus } from "@/lib/types";

export function PreviewActions({
  id,
  slug,
  status,
}: {
  id: string;
  slug: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
        Export PDF
      </button>
      {status === "published" && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={async () => {
            await navigator.clipboard.writeText(`${window.location.origin}/p/${slug}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      )}
      <button
        type="button"
        className="btn"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await api<{ prospectus: Prospectus }>(`/api/prospectuses/${id}/publish`, { method: "POST" });
            router.refresh();
          } finally {
            setBusy(false);
          }
        }}
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
    </>
  );
}
