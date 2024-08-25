"use client";

import ClippingArticle, { TClippingArticle } from "./ClippingArticle";
import { Plus } from "../../../../../../public/assets/svg/SvgIcons";
import { usePagination } from "@/app/(my-repo)/_hook/usePagination";
import LibraryToolbar from "@/app/(my-repo)/_components/LibraryToolbar";
import Link from "next/link";

const FILES = [
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 1 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 2 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 3 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 4 },
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 5 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 6 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 7 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 8 },
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 9 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 10 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 11 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 12 },
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 13 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 14 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 15 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 16 },
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 17 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 18 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 19 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 20 },
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 21 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 22 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 23 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 24 },
  { type: "warning", title: "sfacweb - 1", date: "2024-08-22", id: 25 },
  { type: "notification", title: "sfacweb - 2", date: "2024-08-22", id: 26 },
  { type: "gray", title: "sfacweb - 3", date: "2024-08-22", id: 27 },
  { type: "notification", title: "sfacweb - 4", date: "2024-08-22", id: 28 },
];

export default function ArticleList({
  files = FILES as TClippingArticle[],
}: {
  files?: TClippingArticle[];
}) {
  const {
    currentItems: currentFiles,
    handleMore,
    hasMore,
  } = usePagination(files, "more");

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center gap-[124px]">
        <div className="flex w-full flex-col gap-12">
          <LibraryToolbar />
          <div className="h-auto w-full">
            <ul className="grid w-full grid-cols-3 gap-6">
              {currentFiles &&
                currentFiles.map((file) => (
                  <li key={file.id}>
                    <Link href={`/vulnerability-db/${file.id}`}>
                      <ClippingArticle {...file} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <button
          onClick={handleMore}
          disabled={!hasMore}
          className="flex h-[64px] items-center justify-center gap-1 rounded-lg border border-primary-purple-500 p-5 text-primary-purple-500 hover:bg-bg-purple-light disabled:hidden"
        >
          <span className="text-xl leading-none">더보기</span>
          <Plus />
        </button>
      </section>
    </>
  );
}
