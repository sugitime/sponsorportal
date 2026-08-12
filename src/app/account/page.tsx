import { AppFrame } from "@/components/app-frame";
import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AccountForm } from "./ui";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await requireUser();
  if (!user) redirect("/login");
  return (
    <AppFrame>
      <p className="muted text-[13px] uppercase tracking-[0.2em]">Account</p>
      <h1 className="display mt-3 text-5xl">Your details.</h1>
      <p className="muted mt-3 max-w-xl text-[16px] leading-7">
        These appear on new prospectuses and on notes you send as a sponsor.
      </p>
      <AccountForm
        user={{
          name: user.name,
          organization: user.organization,
          location: user.location,
          industry: user.industry,
          email: user.email,
          role: user.role,
        }}
      />
    </AppFrame>
  );
}
