'use client';

import { useEffect } from "react";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import useDarkModeStore from "./store/useDarkModeStore";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setDarkMode = useDarkModeStore((state) => state.setDarkMode);

  useEffect(() => {
    setDarkMode(localStorage.getItem('darkMode') === 'true');
  }, [setDarkMode]);

  return (
    <html lang="en">
      <body className={`${darkMode ? 'dark:bg-custom-dark-bg' : 'bg-custom-light-bg'} max-w-screen-[1920px] mx-auto flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
