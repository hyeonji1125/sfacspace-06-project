"use client";

import { RepositoryStatus } from "@/types";
import RepositoryChip from "./RepositoryChip";
import BookmarkButton from "./BookmarkButton";
import { format } from "date-fns";
import DetectLink from "./DetectLink";

type TRepositoryItemProps = {
  matchData?: {
    bookmark?: boolean;
    recent?: boolean;
    status?: RepositoryStatus;
  };
  name: string;
  owner: { login: string };
  created_at: string;
};

export default function RepositoryItem({
  name,
  owner,
  created_at,
  matchData,
}: TRepositoryItemProps) {
  return (
    <div className="group flex h-[225px] w-full flex-col justify-between rounded-xl border border-primary-purple-100 p-5 hover:bg-bg-purple-light dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-0 hover:dark:bg-opacity-5">
      <div className="flex flex-col gap-1">
        <div className="flex w-full items-center justify-between gap-4">
          {matchData?.status && <RepositoryChip type={matchData?.status} />}
          {!matchData?.status && (
            <h4 className="max-w-[270px] truncate text-[28px] font-medium leading-[48px] text-text-gray-dark dark:text-text-gray-light">
              {name}
            </h4>
          )}
          <BookmarkButton bookmark={matchData?.bookmark} name={name} />
        </div>
        {matchData?.status && (
          <h4 className="max-w-[270px] truncate text-[28px] font-medium text-text-gray-dark dark:text-text-gray-light">
            name
          </h4>
        )}
      </div>
      <div className="flex items-end justify-between">
        <DetectLink
          status={matchData?.status}
          recent={matchData?.recent}
          owner={owner.login}
          name={name}
        />
        <span className="font-base invisible whitespace-nowrap text-base tracking-tight text-text-gray-default xl:visible">
          {format(created_at, "yy.MM.dd")}
        </span>
      </div>
    </div>
  );
}
