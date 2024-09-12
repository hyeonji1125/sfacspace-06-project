import LoadingBox from "@/components/common/LoadingBox";

function LoadingArticle() {
  return (
    <LoadingBox className="flex h-[226px] flex-col justify-between p-7">
      <div className="flex flex-col gap-4">
        <div className="h-[38px] w-[97px] rounded-full bg-grayscale-10 dark:bg-grayscale-80" />
        <div className="flex w-full flex-col gap-2">
          <div className="h-7 w-full rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
          <div className="h-7 w-20 rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
        </div>
      </div>
      <div className="h-4 w-32 rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
    </LoadingBox>
  );
}

export default function LoadingArticles() {
  const items = Array.from({ length: 6 }, (_, index) => index);
  return (
    <div className="grid w-full grid-cols-3 gap-6">
      {items.map((item) => (
        <LoadingArticle key={item} />
      ))}
    </div>
  );
}
