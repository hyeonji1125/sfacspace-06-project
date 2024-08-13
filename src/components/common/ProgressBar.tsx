"use client";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type ProgressBarProps = {
  percent?: number;
};

export default function ProgressBar({ percent = 0 }: ProgressBarProps) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(Math.min(percent, 100));
  }, [percent]);

  return (
    <div className={twMerge("flex w-full items-center")}>
      <div className={twMerge("h-3 rounded-full bg-[#E6E6E6]", "w-[100%]")}>
        <div
          className={twMerge(
            "h-full rounded-full bg-[#00C308]",
            "transition-all duration-300 ease-linear",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
