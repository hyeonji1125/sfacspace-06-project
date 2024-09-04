'use client'

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"
import { ReactNode, useEffect, useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}