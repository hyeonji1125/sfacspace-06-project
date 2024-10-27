"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Bug, CaretRight } from "../../../../public/assets/svg/SvgIcons";
import { postRepo } from "../_utils/fetchRepos";
import { useSession } from "next-auth/react";
import { RepositoryStatus } from "@/types";

export default function DetectLink({
  status,
  owner,
  name,
  recent,
}: {
  status?: RepositoryStatus;
  owner: string;
  name: string;
  recent?: boolean;
}) {
  const { data } = useSession();
  const email = data?.user?.email ?? "";

  let style;
  switch (status) {
    case "COMPLETED":
      style = "bg-grayscale-100 dark:bg-grayscale-40";
      break;
    default:
      style = "bg-primary-purple-500 dark:bg-primary-purple-300 ";
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
          "flex items-center gap-[7px] whitespace-nowrap rounded-[14px] p-[10px] text-white dark:font-medium dark:text-custom-dark-bg",
          style,
        )}
        onClick={handleClickRepo}
      >
        <Bug color="fill-white dark:fill-custom-dark-bg" />
        {status === "COMPLETED" ? "결과보기" : "검사하기"}
        <CaretRight
          className="h-5 w-5"
          color="fill-white dark:fill-custom-dark-bg"
        />
      </div>
    </Link>
  );
}
