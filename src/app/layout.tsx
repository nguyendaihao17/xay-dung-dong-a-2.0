import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Barlow_Condensed } from "next/font/google";
import { Toaster } from "sonner";
import { buildMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const display = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = buildMetadata({
  title: "Trang chủ",
  description:
    "CÔNG TY TNHH TƯ VẤN THIẾT KẾ - XÂY DỰNG ĐÔNG Á. Tư vấn - Thiết kế - Giám sát - Thi công xây dựng. Niềm tin - Chất lượng - Uy tín.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#0d1f36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-navy-900">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}