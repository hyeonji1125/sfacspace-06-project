"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Bug, CaretRight } from "../../../../public/assets/svg/SvgIcons";
import { postRepo } from "../_utils/fetchRepos";
import { useSession } from "next-auth/react";
import { RepositoryStatus } from "@/types";

export default function DetectLink({
  status,
  id,
  owner,
  name,
  recent,
}: {
  status?: RepositoryStatus;
  id: number;
  owner: string;
  name: string;
  recent?: boolean;
}) {
  const { data } = useSession();
  const email = data?.user?.email ?? "";

  let style;
  switch (status) {
    case "COMPLETED":
      style = "bg-grayscale-100";
      break;
    default:
      style = "bg-primary-purple-500";
      break;
  }

  const handleClickRepo = async () => {
    if (!recent) {
      await postRepo(email, name, { recent: true });
    }
  };

  return (
    <Link
      href={
        status === "COMPLETED"
          ? `/repos/${owner}/${name}`
          : `/repos/${owner}/${name}`
      }
    >
      <div
        className={twMerge(
          "flex items-center gap-[7px] whitespace-nowrap rounded-[14px] p-[10px] text-white",
          style,
        )}
        onClick={handleClickRepo}
      >
        <Bug />
        {status === "COMPLETED" ? "결과보기" : "검사하기"}
        <CaretRight className="h-5 w-5" color="fill-white" />
      </div>
    </Link>
  );
}
