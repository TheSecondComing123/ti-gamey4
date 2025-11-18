import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TI-GAMEY4",
  description:
    "TI-GAMEY4 is the ultimate place to get your TI PLUS CE calculator modded and ready for games, apps, and all types of project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
