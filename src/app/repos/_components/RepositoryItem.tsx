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
        <div className="align-start flex w-full gap-4">
          <div className="flex flex-grow flex-col gap-1">
            {matchData?.status && <RepositoryChip type={matchData?.status} />}
            <h4
              title={name}
              className="max-w-[150px] truncate text-[28px] font-medium leading-[48px] text-text-gray-dark dark:text-text-gray-light"
            >
              {name}
            </h4>
          </div>
          <BookmarkButton bookmark={matchData?.bookmark} name={name} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
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
