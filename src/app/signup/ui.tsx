"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Role } from "@/lib/types";

export function SignupForm({ initialRole }: { initialRole: Role }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await api<{ user: { role: string } }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, organization, role }),
      });
      router.push(result.user.role === "sponsor" ? "/discover" : "/create");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create the account.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 space-y-5">
      <div className="flex gap-2">
        {(["prospect", "sponsor"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={`chip ${role === option ? "chip-on" : ""}`}
            onClick={() => setRole(option)}
          >
            {option === "prospect" ? "I seek partners" : "I am a sponsor"}
          </button>
        ))}
      </div>
      <label className="field">
        <span className="field-label">Name</span>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="field">
        <span className="field-label">Organization</span>
        <input className="input" value={organization} onChange={(e) => setOrganization(e.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">Email</span>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="field">
        <span className="field-label">Password</span>
        <input
          className="input"
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="text-[14px] text-[#b42318]">{error}</p>}
      <button className="btn" disabled={busy}>
        {busy ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}
