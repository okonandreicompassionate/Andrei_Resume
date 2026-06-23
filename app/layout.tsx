import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import CursorSpotlight from "./components/CursorSpotlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Andrei Okon",
  description: "Frontend Engineer Portfolio",
  icons: {
    icon: "https://i.imgur.com/sWBWKT9.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative bg-[#0A0A0A] text-white antialiased">
        <CursorSpotlight />
    
        {children}
      </body>
    </html>
  );
}