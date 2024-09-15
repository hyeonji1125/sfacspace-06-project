"use client";

import { Article } from "@/types/scrap";
import ClippingArticle from "./ClippingArticle";
import Link from "next/link";
import { useScrapStore } from "@/store/useScrapStore";
import LoadingArticles from "./LoadingArticles";
import { useEffect } from "react";
import { TbArticleOff } from "react-icons/tb";
import EmptyContent from "@/components/common/EmptyContent";

export default function ArticleList({
  currentArticles,
}: {
  currentArticles: Article[];
}) {
  const { isLoading, error } = useScrapStore();
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (isLoading) return <LoadingArticles />;
  if (error) return <p>{error}</p>;

  return (
    <>
      {!isLoading && currentArticles.length === 0 && (
        <EmptyContent
          icon={
            <TbArticleOff className="h-16 w-16 text-text-gray-light dark:text-text-gray-dark" />
          }
        >
          스크랩한 게시물이 없어요.
        </EmptyContent>
      )}
      <ul className="grid w-full grid-cols-3 gap-6">
        {currentArticles &&
          currentArticles.map((article) => (
            <li key={article.id}>
              <Link href={`/vuldb/items/${article.id}`}>
                <ClippingArticle {...article} />
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
