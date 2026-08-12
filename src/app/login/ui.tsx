"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const demos = [
  { label: "Creator", email: "ivan.p@example.net" },
  { label: "Sponsor", email: "uma.s@example.org" },
  { label: "Admin", email: "ivan.p@example.net" },
];

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("ivan.p@example.net");
  const [password, setPassword] = useState("Demo1234!");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await api<{ user: { role: string } }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const dest =
        nextPath ||
        (result.user.role === "admin" ? "/admin" : result.user.role === "sponsor" ? "/discover" : "/dashboard");
      router.push(dest);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 space-y-5">
      <div className="flex flex-wrap gap-2">
        {demos.map((demo) => (
          <button
            key={demo.email}
            type="button"
            className="chip"
            onClick={() => {
              setEmail(demo.email);
              setPassword("Demo1234!");
            }}
          >
            {demo.label}
          </button>
        ))}
      </div>
      <label className="field">
        <span className="field-label">Email</span>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="field">
        <span className="field-label">Password</span>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="text-[14px] text-[#b42318]">{error}</p>}
      <button className="btn" disabled={busy}>
        {busy ? "Signing in…" : "Continue"}
      </button>
    </form>
  );
}
