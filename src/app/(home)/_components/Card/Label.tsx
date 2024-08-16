"use client";
import { ReactNode } from "react";

export default function Label({
  bg,
  color,
  children,
}: {
  bg: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: bg,
          border: `1px solid ${color}`,
          color: color,
        }}
        className="flex h-[38px] items-center justify-center rounded-full px-3 py-2 text-sm md:h-[46px] md:text-xl"
      >
        {children}
      </div>
    </>
  );
}
