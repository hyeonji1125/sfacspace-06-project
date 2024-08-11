"use client";

import { useEffect } from "react";
import useDarkModeStore from "../store/useDarkModeStore";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopButton from "@/components/TopButton";
import AskButton from "@/components/AskButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setDarkMode = useDarkModeStore((state) => state.setDarkMode);

  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, [setDarkMode]);

  return (
    <html lang="en">
      <body
        className={`${darkMode ? "dark:bg-custom-dark-bg" : "bg-custom-light-bg"} max-w-screen-[1920px] mx-auto flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <AskButton />
        <TopButton />
        <Footer />
      </body>
    </html>
  );
}
