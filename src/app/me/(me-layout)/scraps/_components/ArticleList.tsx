"use client";

import { Article } from "@/types/scrap";
import ClippingArticle from "./ClippingArticle";
import Link from "next/link";
import { useScrapStore } from "@/store/useScrapStore";
import LoadingArticles from "./LoadingArticles";
import { TbArticleOff } from "react-icons/tb";
import EmptyContent from "@/components/common/EmptyContent";

export default function ArticleList({
  currentArticles,
}: {
  currentArticles: Article[];
}) {
  const { status, error } = useScrapStore();

  if (status === "LOADING" || status === "IDLE") return <LoadingArticles />;
  if (error) return <p>{error}</p>;

  return (
    <>
      {status === "SUCCESS" && currentArticles.length === 0 && (
        <EmptyContent
          icon={
            <TbArticleOff className="h-16 w-16 text-text-gray-light dark:text-text-gray-dark" />
          }
        >
          스크랩한 게시물이 없어요.
        </EmptyContent>
      )}
      {currentArticles.length !== 0 && (
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
      )}
    </>
  );
}
