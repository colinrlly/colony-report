import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colony Report",
  description: "Concept art project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/earth logo_ for web.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
