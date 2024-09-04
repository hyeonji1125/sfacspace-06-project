"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGithubStore } from "../../../../../store/useGithubStore";

export default function Breadcrumb({
  owner,
  name,
}: {
  owner: string;
  name: string;
}) {
  const router = useRouter();
  const { currentPath } = useGithubStore();

  if (!currentPath) return null;

  const paths = currentPath.split("/").filter(Boolean);

  const handleClick = (index: number) => {
    const newPath = paths.slice(0, index + 1).join("/");
    router.push(`/repos/${owner}/${name}?repo=${newPath}`);
  };

  return (
    <div className="custom-scrollbar flex w-[247px] overflow-auto px-5 py-[10px] text-sm text-line-default">
      <Link href={`/repos/${owner}/${name}`}>
        <span className="whitespace-nowrap">All Files</span>
      </Link>
      <ul className="flex">
        {paths.map((segment, index) => (
          <li
            key={index}
            className={`flex items-center ${index === paths.length - 1 && "text-primary-purple-500 dark:text-primary-purple-300"}`}
          >
            <span className="mx-1">/</span>
            <span
              className="cursor-pointer whitespace-nowrap"
              onClick={() => handleClick(index)}
            >
              {segment}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
