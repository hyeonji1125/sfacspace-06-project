import AskButton from "@/components/common/AskButton";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopButton from "@/components/common/TopButton";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FLAWDETECTOR",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} max-w-screen-[1920px] mx-auto flex min-h-screen flex-col`}
      >
        <Providers>
          <ThemeProvider attribute="class">
            <Header />
            <main className="flex flex-grow flex-col">{children}</main>
            <AskButton />
            <TopButton />
            <Footer />
          </ThemeProvider>
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
