import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Barlow_Condensed } from "next/font/google";
import { clientConfig } from "@/lib/env-client";
import "./globals.css";

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clientConfig.NEXT_PUBLIC_SITE_URL),
  title: {
    default: clientConfig.NEXT_PUBLIC_SITE_NAME,
    template: "%s | " + clientConfig.NEXT_PUBLIC_SITE_NAME,
  },
  description: "Tu van - Thiet ke - Giam sat - Thi cong xay dung",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2140",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={body.variable + " " + display.variable}>
      <body className="bg-white font-sans text-neutral-800 antialiased">{children}</body>
    </html>
  );
}