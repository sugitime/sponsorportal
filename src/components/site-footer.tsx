import Link from "next/link";
import { Mark } from "./mark";

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 border-t border-[var(--line)]">
      <div className="page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Mark />
          <p className="muted mt-4 max-w-sm text-[14px] leading-6">
            A quiet studio for making the case. Write a prospectus, share a link, meet the
            partner who was looking for you.
          </p>
        </div>
        <div className="text-[13px] leading-8">
          <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Product
          </p>
          <Link href="/discover" className="block hover:opacity-70">
            Discover
          </Link>
          <Link href="/templates" className="block hover:opacity-70">
            Templates
          </Link>
          <Link href="/signup" className="block hover:opacity-70">
            Create an account
          </Link>
        </div>
        <div className="text-[13px] leading-8">
          <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Studio
          </p>
          <Link href="/login" className="block hover:opacity-70">
            Sign in
          </Link>
          <Link href="/signup?role=sponsor" className="block hover:opacity-70">
            For sponsors
          </Link>
          <p className="muted">© {new Date().getFullYear()} SponsorPortal</p>
        </div>
      </div>
    </footer>
  );
}
