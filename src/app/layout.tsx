import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "SponsorPortal",
    template: "%s · SponsorPortal",
  },
  description:
    "A quiet studio for sponsorship prospectuses. Write, refine, and share a case for partnership.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
