import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import type { Role } from "@/lib/types";
import { Mark } from "./mark";
import { ThemeToggle } from "./theme-toggle";
import { SignOutButton } from "./sign-out-button";

const links: Record<Role, { href: string; label: string }[]> = {
  prospect: [
    { href: "/dashboard", label: "Studio" },
    { href: "/create", label: "New" },
    { href: "/inbox", label: "Interest" },
    { href: "/discover", label: "Discover" },
  ],
  sponsor: [
    { href: "/discover", label: "Discover" },
    { href: "/inbox", label: "Sent" },
    { href: "/account", label: "Account" },
  ],
  admin: [
    { href: "/admin", label: "Overview" },
    { href: "/admin/users", label: "People" },
    { href: "/admin/templates", label: "Templates" },
    { href: "/admin/moderation", label: "Moderation" },
    { href: "/admin/settings", label: "Settings" },
  ],
};

export async function AppFrame({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Role[];
}) {
  const user = await requireUser(roles);
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-40 nav-blur border-b border-[var(--line)]">
        <div className="page flex h-16 items-center justify-between gap-4">
          <Link href={user.role === "admin" ? "/admin" : user.role === "sponsor" ? "/discover" : "/dashboard"}>
            <Mark />
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] text-[var(--ink-soft)] md:flex">
            {links[user.role].map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--ink)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle compact />
            <Link href="/account" className="btn-ghost hidden text-[13px] sm:inline-flex">
              {user.name.split(" ")[0]}
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <nav className="no-print page flex gap-4 overflow-x-auto py-3 text-[13px] text-[var(--ink-soft)] md:hidden">
        {links[user.role].map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-[var(--ink)]">
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="page py-10">{children}</main>
    </div>
  );
}
