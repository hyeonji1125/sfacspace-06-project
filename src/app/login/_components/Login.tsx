"use client";

import Button from "@/components/common/Button";
import { signIn } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export const Login = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      theme="filled"
      size="small"
      isRound
      className={twMerge(
        "px-5 py-2 dark:bg-primary-purple-300 dark:font-normal dark:text-custom-dark-bg hover:dark:bg-primary-purple-200 md:h-[56px] md:w-[354px] md:px-6 md:py-4 md:text-2xl",
        className && className,
      )}
    >
      {children}
    </Button>
  );
};
