"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { INDUSTRIES, type Role } from "@/lib/types";

export function AccountForm({
  user,
}: {
  user: {
    name: string;
    organization: string;
    location: string;
    industry: string;
    email: string;
    role: Role;
  };
}) {
  const [name, setName] = useState(user.name);
  const [organization, setOrganization] = useState(user.organization);
  const [location, setLocation] = useState(user.location);
  const [industry, setIndustry] = useState(user.industry);
  const [status, setStatus] = useState("");

  return (
    <form
      className="mt-10 max-w-xl space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await api("/api/account", {
          method: "PATCH",
          body: JSON.stringify({ name, organization, location, industry }),
        });
        setStatus("Saved.");
      }}
    >
      <label className="field">
        <span className="field-label">Name</span>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">Organization</span>
        <input className="input" value={organization} onChange={(e) => setOrganization(e.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">Location</span>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">Industry</span>
        <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">Select</option>
          {INDUSTRIES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <p className="muted text-[13px]">{user.email} · {user.role}</p>
      <button className="btn">Save</button>
      {status && <p className="text-[14px]">{status}</p>}
    </form>
  );
}
