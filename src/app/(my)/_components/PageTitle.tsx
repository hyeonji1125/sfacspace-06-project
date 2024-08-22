import Link from "next/link";
import { CaretLeft } from "../../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";

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
    <div
      className={twMerge(
        "inline-flex w-auto max-w-max items-center justify-center gap-6 rounded-full border-4 border-primary-purple-500 p-5",
        className && className,
      )}
    >
      <Link href={link ? link : "/me/profile"}>
        <CaretLeft />
      </Link>
      <h2 className="select-none text-5xl text-primary-purple-500">
        {children}
      </h2>
    </div>
  );
}
