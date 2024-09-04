"use client";

import { twMerge } from "tailwind-merge";

type TTextareaProps = {} & React.ComponentPropsWithRef<"textarea">;

export default function Textarea({ className, ...rest }: TTextareaProps) {
  return (
    <textarea
      className={twMerge(
        "w-full resize-none rounded-lg border border-line-gray-10 bg-transparent p-3 text-lg font-medium text-custom-light-text outline-none placeholder:text-text-gray-light valid:bg-bg-purple-light valid:placeholder-shown:bg-transparent invalid:border-accent-red invalid:bg-bg-red-light focus:border-primary-purple-500 disabled:bg-bg-gray-light dark:border-custom-light-text dark:bg-transparent dark:text-custom-dark-text dark:placeholder:text-custom-light-text dark:valid:bg-bg-purple-light dark:valid:bg-opacity-5 dark:invalid:border-accent-red dark:invalid:bg-bg-red-light dark:invalid:bg-opacity-5 dark:focus:border-primary-purple-500 dark:disabled:bg-bg-gray-light dark:disabled:bg-opacity-5",
        className,
      )}
      {...rest}
    />
  );
}
