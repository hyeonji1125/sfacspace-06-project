"use client";

import { FilterType } from "@/types/library";
import {
  Bookmark,
  DropdownArrowIcon,
  RecentFile,
} from "../../../../public/assets/svg/SvgIcons";

function LoadingRepo() {
  return (
    <div className="group flex h-[225px] w-full flex-col justify-between rounded-xl border border-grayscale-10 p-5 dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-0">
      <div className="flex h-full w-full animate-pulse flex-col justify-between opacity-80">
        <div className="h-8 w-32 rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
        <div className="flex items-end justify-between">
          <div className="h-[48px] w-[148px] rounded-[14px] bg-grayscale-10 dark:bg-grayscale-80" />
          <div className="invisible h-5 w-12 rounded-xl bg-grayscale-10 dark:bg-grayscale-80 xl:visible" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingRepository() {
  const REPO_FILTER_BUTTONS: Array<{
    name: keyof FilterType;
    label: string;
    icon: JSX.Element;
  }> = [
    {
      name: "recent",
      label: "Recents File",
      icon: <RecentFile color="dark:fill-grayscale-70 fill-grayscale-20" />,
    },
    {
      name: "bookmark",
      label: "Bookmark",
      icon: <Bookmark color="dark:fill-grayscale-70 fill-grayscale-20" />,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-12">
        <div className="flex gap-[21px]">
          {REPO_FILTER_BUTTONS.map((button) => (
            <button
              key={button.label}
              className="flex w-full items-center justify-center gap-[10px] rounded-xl border border-line-gray-10 p-4 text-xl font-semibold text-grayscale-20 hover:bg-transparent dark:border-opacity-20 dark:text-grayscale-70 sm:p-4 sm:text-xl md:p-4 md:text-xl"
              name={button.name}
              disabled
            >
              {button.icon} {button.label}
            </button>
          ))}
        </div>
        <div className="flex w-full items-center justify-between">
          <h3 className="text-[32px] font-medium text-grayscale-30 dark:text-grayscale-50">
            Loading...
          </h3>
          <div className="flex gap-[10px]">
            {["Type", "Sort"].map((item) => (
              <div className="flex gap-1 rounded-lg border border-grayscale-10 p-[10px] text-grayscale-20 dark:border-opacity-20 dark:text-grayscale-70">
                {item}
                <DropdownArrowIcon />
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-6">
        {Array(16).fill(<LoadingRepo />)}
      </div>
    </div>
  );
}
