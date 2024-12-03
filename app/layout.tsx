import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/parts/nav";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const space = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BetterGames | The world's simplest gamified marketing tool",
  description:
    "BetterGames is the world's simplest gamified marketing tool. Built for graphics designers and marketers looking for an edge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${space.className} flex flex-col-reverse sm:grid sm:overflow-hidden sm:h-screen sm:w-screen sm:grid-cols-[256px,1fr]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="py-4 pr-4 pl-4 sm:pl-0 flex flex-col gap-4 min-h-screen">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
