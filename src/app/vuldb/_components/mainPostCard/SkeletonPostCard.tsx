export default function SkeletonPostCard() {
  return (
    <div className="relative flex h-[253px] w-[865px] animate-pulse flex-col rounded-lg border border-line-default bg-white p-7 dark:bg-custom-light-bg dark:bg-opacity-5">
      <div className="flex items-center gap-2 pb-1">
        <div className="h-[35px] w-[59px] rounded-lg bg-gray-200 dark:bg-gray-600"></div>
        <div className="h-[28px] w-[70%] rounded bg-gray-200 dark:bg-gray-600"></div>
      </div>
      <div className="h-[20px] w-[50%] rounded bg-gray-200 pb-5 dark:bg-gray-600"></div>
      <div className="flex h-[59px] w-[809px] items-center rounded-2xl bg-bg-purple-light px-5 dark:bg-custom-light-bg dark:bg-opacity-20">
        <div className="h-[18px] w-full rounded bg-gray-200 dark:bg-gray-600"></div>
      </div>
      <div className="flex w-full justify-between pt-6">
        <div className="z-10 flex space-x-3">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
          <div className="h-[40px] w-[40px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
        </div>
        <div className="h-[18px] w-[80px] rounded bg-gray-200 dark:bg-gray-600"></div>
      </div>
    </div>
  );
}
