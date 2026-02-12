import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Glialink",
  description: "Interactive research project profiles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
