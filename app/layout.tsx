import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfterAI — Production AI Change Intelligence",
  description: "Make AI change decisions explicit, comparable, and defensible — without sitting in your inference path.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
