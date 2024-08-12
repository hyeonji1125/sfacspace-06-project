"use client";

import { twMerge } from "tailwind-merge";

type TInputProps = {} & React.ComponentPropsWithRef<"input">;

export default function Input({ className, ...rest }: TInputProps) {
  return (
    <input
      className={twMerge(
        "border-line-gray-10 valid:bg-bg-purple-light dark:valid:bg-bg-purple-light invalid:bg-bg-red-light dark:invalid:bg-bg-red-light dark:invalid:border-accent-red invalid:border-accent-red placeholder:text-text-gray-light disabled:bg-bg-gray-light dark:disabled:bg-bg-gray-light w-full rounded-lg border bg-transparent p-3 text-lg font-medium text-custom-light-text outline-none focus:border-primary-purple-500 dark:border-custom-light-text dark:bg-transparent dark:text-custom-dark-text dark:placeholder:text-custom-light-text dark:valid:bg-opacity-5 dark:invalid:bg-opacity-5 dark:focus:border-primary-purple-500 dark:disabled:bg-opacity-5",
        className,
      )}
      {...rest}
    />
  );
}
