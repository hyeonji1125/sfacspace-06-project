import { RepositoryProps } from "@/types";
import RepositoryChip from "./RepositoryChip";
import BookmarkButton from "./BookmarkButton";
import { format } from "date-fns";
import DetectLink from "./DetectLink";

export default function RepositoryItem({
  id,
  name,
  status,
  owner,
  created_at,
  bookmark,
}: RepositoryProps) {
  return (
    <div className="group flex h-[225px] w-full flex-col justify-between rounded-xl border border-primary-purple-100 p-5 hover:bg-bg-purple-light dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-0 hover:dark:bg-opacity-5">
      <div className="flex flex-col gap-1">
        <div className="flex w-full items-center justify-between">
          {status && <RepositoryChip type={status} />}
          {!status && (
            <h4 className="text-text-gray-dark max-w-[270px] truncate text-[28px] font-medium dark:text-text-gray-light">
              {name}
            </h4>
          )}
          <BookmarkButton bookmark={bookmark} id={id} name={name} />
        </div>
        {status && (
          <h4 className="text-text-gray-dark max-w-[270px] truncate text-[28px] font-medium dark:text-text-gray-light">
            name
          </h4>
        )}
      </div>
      <div className="flex items-end justify-between">
      <DetectLink id={id} status={status} owner={owner.login} name={name} />
        <span className="whitespace-nowrap text-base font-medium tracking-tight text-text-gray-default">
          {format(created_at, "yy.MM.dd")}
        </span>
      </div>
    </div>
  );
}
