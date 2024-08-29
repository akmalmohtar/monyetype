import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { cn } from "@/lib/utils";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Monyetype",
  description: "",
};

const MonyetHeader = () => <h1>hahsdahsdha</h1>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(ibm_plex_mono.className, "flex flex-col h-screen")}>
        <header className="h-[15%] text-6xl text-center font-semibold p-8 tracking-wider">
          Monye<span className="text-orange-600">t</span>ype
          <span className="text-orange-600">.</span>
        </header>
        <main className={cn("h-full")}>{children}</main>
        <footer className={cn("h-[5%]")}>
          <span>By Akmal Mohtar and Wan Nor Adzahari</span>
        </footer>
      </body>
    </html>
  );
}
