import Link from "next/link";
import { readSession } from "@/lib/auth";
import { Mark } from "./mark";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const session = await readSession();
  const home = session
    ? session.role === "admin"
      ? "/admin"
      : session.role === "sponsor"
        ? "/discover"
        : "/dashboard"
    : "/";

  return (
    <header
      className={`no-print sticky top-0 z-40 ${transparent ? "" : "nav-blur border-b border-[var(--line)]"}`}
    >
      <div className="page flex h-16 items-center justify-between">
        <Link href={home} className="transition-opacity hover:opacity-70">
          <Mark />
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] text-[var(--ink-soft)] md:flex">
          <Link href="/discover" className="transition-colors hover:text-[var(--ink)]">
            Discover
          </Link>
          <Link href="/templates" className="transition-colors hover:text-[var(--ink)]">
            Templates
          </Link>
          <Link href="/#how" className="transition-colors hover:text-[var(--ink)]">
            How it works
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle compact />
          {session ? (
            <Link href={home} className="btn btn-sm ml-2">
              Open studio
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-ghost hidden sm:inline-flex">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-sm ml-1">
                Begin
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
