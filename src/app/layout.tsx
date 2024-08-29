import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/NavBar";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Monyetype",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(ibm_plex_mono.className, "flex flex-col h-screen")}>
        <header className="flex flex-col space-y-8 items-center text-6xl text-center font-semibold p-2 tracking-wider">
          <span>
            Monye<span className="text-orange-600">t</span>ype
            <span className="text-orange-600">.</span>
          </span>
          <NavBar />
        </header>
        <main className={cn("h-full")}>{children}</main>
        <footer className={cn("h-[5%]")}>
          <span>By Akmal Mohtar and Wan Nor Adzahari</span>
        </footer>
      </body>
    </html>
  );
}
