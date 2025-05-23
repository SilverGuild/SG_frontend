import type { Metadata } from "next";
import { beau_rivage, geistSans, geistMono } from './fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "SilverGuild",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beau_rivage.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
