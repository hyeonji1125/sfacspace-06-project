"use client";

import LoadingBox from "@/components/common/LoadingBox";

function LoadingRepo() {
  return (
    <LoadingBox className="h-[225px]">
      <div className="h-8 w-32 rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
      <div className="flex items-end justify-between">
        <div className="h-[48px] w-[148px] rounded-[14px] bg-grayscale-10 dark:bg-grayscale-80" />
        <div className="invisible h-5 w-12 rounded-xl bg-grayscale-10 dark:bg-grayscale-80 xl:visible" />
      </div>
    </LoadingBox>
  );
}

export default function LoadingRepository() {
  const items = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="grid w-full min-w-[980px] grid-cols-4 gap-6">
      {items.map((item) => (
        <LoadingRepo key={item} />
      ))}
    </div>
  );
}
