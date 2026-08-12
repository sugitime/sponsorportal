"use client";

import { useRouter } from "next/navigation";

export function ReviewNote({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn-ghost btn-sm mt-4"
      onClick={async () => {
        await fetch("/api/interests/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        router.refresh();
      }}
    >
      Mark reviewed
    </button>
  );
}
