"use client";

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
  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {Array(16).fill(<LoadingRepo />)}
    </div>
  );
}
