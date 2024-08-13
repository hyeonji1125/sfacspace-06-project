'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { DarkModeState } from "@/types";

const DarkModeContext = createContext<DarkModeState | null>(null);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    
    // localStorage에서 초기 값을 가져와 설정
    const savedMode = localStorage.getItem('darkMode') === 'true';
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return savedMode;
  });

  // 다크 모드 상태 변경 시 documentElement 클래스 업데이트
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
  };

  const toggleDarkMode = () => {
    setDarkModeState(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }

  return context;
}
