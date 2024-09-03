import Link from "next/link";

import { twMerge } from "tailwind-merge";
import { TitleCaret } from "../../../public/assets/svg/SvgIcons";

export default function PageTitle({
  children,
  className,
  link,
}: {
  children: React.ReactNode;
  className?: string;
  link?: string;
}) {
  return (
    <Link href={link ? link : "/me"}>
      <div
        className={twMerge(
          "inline-flex w-auto max-w-max items-center justify-center gap-6 rounded-full border-4 border-primary-purple-500 p-5",
          className && className,
        )}
      >
        <TitleCaret />
        <h2 className="select-none text-[40px] leading-[36px] text-primary-purple-500">
          {children}
        </h2>
      </div>
    </Link>
  );
}
