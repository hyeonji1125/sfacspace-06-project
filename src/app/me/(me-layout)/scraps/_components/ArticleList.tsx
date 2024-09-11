"use client";

import { useFilterArticles } from "@/hooks/useFilterItems";
import ClippingArticle, { TClippingArticle } from "./ClippingArticle";
import LibraryToolbar, {
  TDropdownSelect,
} from "@/app/repos/_components/LibraryToolbar";
import Pagination from "@/app/vuldb/_components/Pagination";
import usePaginationStore from "@/store/usePaginationStore";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { sortArticles } from "@/utils/sortItems";
import { getScrapPosts } from "@/lib/scrapPost";
import { useGetUser } from "@/hooks/useGetUser";

export default function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentArticles, setCurrentArticles] = useState<TClippingArticle[]>(
    [],
  );
  const [selectedItem, setSelectedItem] = useState<TDropdownSelect>({
    type: "Type",
    sort: "Sort",
  });
  const { scrapsItemsPerPage } = usePaginationStore();
  const { email } = useGetUser();
  const typeOptions = [
    "전체",
    "취약성 경고",
    "취약성 알림",
    "취약성 보고서",
    "기타",
  ];

  useFilterArticles(selectedItem, setFilteredArticles, articles);

  const fetchScraps = useCallback(async () => {
    if (email) {
      const scraps = await getScrapPosts(email);
      setArticles(scraps);
      setFilteredArticles(scraps);
    }
  }, [email]);

  useEffect(() => {
    fetchScraps();
  }, [fetchScraps]);

  useEffect(() => {
    sortArticles(selectedItem.sort, setArticles);
  }, [selectedItem.sort, setArticles]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * scrapsItemsPerPage;
    const endIndex = startIndex + scrapsItemsPerPage;
    setCurrentArticles(filteredArticles.slice(startIndex, endIndex));
  }, [filteredArticles, currentPage, scrapsItemsPerPage]);

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center gap-[124px]">
        <div className="flex w-full flex-col gap-12">
          <LibraryToolbar
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
            options={typeOptions}
          />
          <div className="h-auto w-full">
            <ul className="grid w-full grid-cols-3 gap-6">
              {currentArticles.length === 0 && "데이터 없음"}
              {currentArticles &&
                currentArticles.map((article) => (
                  <li key={article.c_id}>
                    <Link href={`/vuldb/items/${article.c_id}`}>
                      <ClippingArticle {...article} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <Pagination
            totalItems={articles.length}
            current={currentPage}
            setCurrent={setCurrentPage}
            numberPerPage={scrapsItemsPerPage}
          />
        </div>
      </section>
    </>
  );
}
