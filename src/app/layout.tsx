import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import FixedChrome from "@/components/ui/FixedChrome";
import RightPanel from "@/components/ui/RightPanel";
import CommandPalette from "@/components/ui/CommandPalette";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Grain from "@/components/ui/Grain";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Euger Bonete Jr",
  description: "Full-stack developer who builds fast, accessible web apps with a focus on great user experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>
          <Grain />
          <Navbar />
          <FixedChrome />
          <RightPanel />
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
