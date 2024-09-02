"use client";

import { useFilterArticles } from "@/hooks/useFilterItems";
import ClippingArticle, { TClippingArticle } from "./ClippingArticle";
import LibraryToolbar, {
  TDropdownSelect,
} from "@/app/repos/_components/LibraryToolbar";
import Pagination from "@/app/vuldb/_components/Pagination";
import usePaginationStore from "@/store/usePaginationStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sortItems } from "@/utils/sortItems";

const FILES = [
  {
    type: "warning",
    name: "sfacweb - 1asdwdasdasdwdsdasdsds",
    created_at: "2024-08-22",
    id: 1,
  },
  {
    type: "notification",
    name: "sfacweb - 2",
    created_at: "2024-08-22",
    id: 2,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 3 },
  {
    type: "notification",
    name: "sfacweb - 4",
    created_at: "2024-08-22",
    id: 4,
  },
  { type: "warning", name: "sfacweb - 1", created_at: "2024-08-22", id: 5 },
  {
    type: "notification",
    name: "agbvddsa",
    created_at: "2024-08-22",
    id: 6,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 7 },
  {
    type: "12415234",
    name: "sfacweb - 4",
    created_at: "2024-08-21",
    id: 8,
  },
  { type: "warning", name: "sfacweb - 1", created_at: "2024-08-22", id: 9 },
  {
    type: "notification",
    name: "sfacweb - 2",
    created_at: "2022-08-22",
    id: 10,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 11 },
  {
    type: "notification",
    name: "sfacweb - 4",
    created_at: "2018-08-22",
    id: 12,
  },
  { type: "warning", name: "sfacweb - 1", created_at: "2024-08-22", id: 13 },
  {
    type: "notification",
    name: "bbbeb - 2",
    created_at: "2024-08-22",
    id: 14,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 15 },
  {
    type: "notification",
    name: "sfacweb - 4",
    created_at: "2024-08-22",
    id: 16,
  },
  { type: "warning", name: "sfacweb - 1", created_at: "2024-08-22", id: 17 },
  {
    type: "notification",
    name: "sfacweb - 2",
    created_at: "2024-08-22",
    id: 18,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 19 },
  {
    type: "notification",
    name: "sfacweb - 4",
    created_at: "2024-08-22",
    id: 20,
  },
  { type: "warning", name: "sfacweb - 1", created_at: "2024-08-22", id: 21 },
  {
    type: "notification",
    name: "sfacweb - 2",
    created_at: "2024-08-22",
    id: 22,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 23 },
  {
    type: "notification",
    name: "sfacweb - 4",
    created_at: "2024-08-22",
    id: 24,
  },
  { type: "warning", name: "sfacweb - 1", created_at: "2024-08-22", id: 25 },
  {
    type: "notification",
    name: "sfacweb - 2",
    created_at: "2024-08-22",
    id: 26,
  },
  { type: "gray", name: "sfacweb - 3", created_at: "2024-08-22", id: 27 },
  {
    type: "notification",
    name: "sfacweb - 4",
    created_at: "2024-08-22",
    id: 28,
  },
];

export default function ArticleList({
  files = FILES as TClippingArticle[],
}: {
  files?: TClippingArticle[];
}) {
  const [articles, setArticles] = useState<TClippingArticle[]>(files);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentArticles, setCurrentArticles] = useState<TClippingArticle[]>(
    [],
  );
  const [selectedItem, setSelectedItem] = useState<TDropdownSelect>({
    type: "Type",
    sort: "Sort",
  });
  const { scrapsItemsPerPage } = usePaginationStore();
  const typeOptions = ["전체", "취약성 경고", "취약성 알림", "취약성 보고서"];

  useFilterArticles(selectedItem, setArticles, files);

  useEffect(() => {
    sortItems(selectedItem.sort, setArticles);
  }, [selectedItem.sort, setArticles]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * scrapsItemsPerPage;
    const endIndex = startIndex + scrapsItemsPerPage;
    setCurrentArticles(articles.slice(startIndex, endIndex));
  }, [articles, currentPage, scrapsItemsPerPage]);

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
              {currentArticles &&
                currentArticles.map((article) => (
                  <li key={article.id}>
                    <Link href={`/vulnerability-db/${article.id}`}>
                      <ClippingArticle {...article} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <Pagination
            totalItems={articles.length}
            type="SCRAPS"
            current={currentPage}
            setCurrent={setCurrentPage}
            numberPerPage={scrapsItemsPerPage}
          />
        </div>
      </section>
    </>
  );
}
