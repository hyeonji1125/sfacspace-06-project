import LoadingBox from "@/components/common/LoadingBox";

function LoadingArticle() {
  return (
    <LoadingBox className="">
      <div className="h-7 w-full rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
      <div />
      <div />
    </LoadingBox>
  );
}

export default function LoadingArticles() {
  return (
    <>
      <LoadingArticle />
    </>
  );
}
