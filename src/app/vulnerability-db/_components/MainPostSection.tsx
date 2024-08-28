"use client";

import Button from "@/components/common/Button";
import usePaginationStore from "@/store/usePaginationStore";
import { useSortStore } from "@/store/useSortStore";
import { MockPostCardTypes } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setPostChips } from "../_utils/chipsLogic";
import { sortPostCards } from "../_utils/sortPostCard";
import PostCardMock from "./_data/postCardMock";
import TagButton from "./button/TagButton";
import MainPostCardList from "./mainPostCard/MainPostCardList";
import Pagination from "./Pagination";

export default function MainPostSection() {
  const { data: session } = useSession();
  const { sortType, setSortType } = useSortStore();
  const { currentPage, setCurrentPage, itemsPerPage } = usePaginationStore();
  const [postDataWithChips, setPostDataWithChips] = useState<
    MockPostCardTypes[]
  >([]);

  useEffect(() => {
    const sortedData = sortPostCards(
      PostCardMock,
      sortType === "hot" ? "views" : "date",
    );
    const dataWithChips = setPostChips(sortedData);
    setPostDataWithChips(dataWithChips);
  }, [sortType, currentPage, itemsPerPage]);

  const handleSortChange = (type: "hot" | "new") => {
    setSortType(type);
    setCurrentPage(1); // 페이지를 1로 초기화
  };

  return (
    <>
      <section className="relative flex flex-col gap-4">
        <div
          className={`flex flex-col gap-4 ${!session ? "pointer-events-none blur-[10px]" : ""}`}
        >
          <h1 className="text-2xl font-semibold">취약점 DB</h1>
          <div className="flex gap-3">
            <TagButton
              label="HOT"
              isActive={sortType === "hot"}
              onClick={() => handleSortChange("hot")}
              type="hot"
            />
            <TagButton
              label="NEW"
              isActive={sortType === "new"}
              onClick={() => handleSortChange("new")}
              type="new"
            />
          </div>
          <MainPostCardList postData={postDataWithChips} />
        </div>
        {!session && (
          <div className="absolute left-1/2 top-0 z-10 flex h-[210px] w-[341px] -translate-x-1/2 translate-y-1/2 transform flex-col items-center justify-center gap-7 rounded-[20px] bg-white py-10 shadow-custom-shadow">
            <p className="text-xl font-medium">자세한 정보를 보고 싶다면?</p>
            <Link href="/login">
              <Button
                className="h-[74px] w-[119px] border-2 border-primary-purple-500"
                theme="outlined"
                size="middle"
                isRound
              >
                Login
              </Button>
            </Link>
          </div>
        )}
        <Pagination totalItems={postDataWithChips.length} />
      </section>
    </>
  );
}
