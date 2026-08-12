import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { readSession } from "@/lib/auth";
import { DiscoverBoard } from "./ui";

export const metadata = { title: "Discover" };

export default async function DiscoverPage() {
  const session = await readSession();
  return (
    <div>
      {session ? null : <SiteHeader />}
      {session ? (
        <DiscoverShell>
          <DiscoverBoard role={session.role} />
        </DiscoverShell>
      ) : (
        <>
          <section className="page pt-16">
            <DiscoverBoard role="guest" />
          </section>
          <SiteFooter />
        </>
      )}
    </div>
  );
}

async function DiscoverShell({ children }: { children: React.ReactNode }) {
  const { AppFrame } = await import("@/components/app-frame");
  return <AppFrame>{children}</AppFrame>;
}
