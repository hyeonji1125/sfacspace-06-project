"use client";

import Button from "@/components/common/Button";
import { PostDataType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TagButton from "../_components/button/TagButton";
import ImageCardList from "../_components/imageCard/ImageCardList";
import MainPostCardList from "../_components/mainPostCard/MainPostCardList";
import SearchBar from "../_components/SearchBar";

import TopicList from "../_components/TopicList";
import VuldbPagination from "../_components/VuldbPagiNation";

export default function VulnerabilityDb() {
  const { data: session } = useSession();
  const [searchResults, setSearchResults] = useState<PostDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // 페이지 상태 관리
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const ITEMS_PER_PAGE = 5;
  const [sortType, setSortType] = useState<"hot" | "new">("hot"); // hot,new 태그 정렬 관리
  const [totalItems, setTotalItems] = useState(0); // 총 게시글 수

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/vuldb/search?query=${encodeURIComponent(query)}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        );
        const data = await res.json();
        console.log("page.tsx", data);
        console.log("Fetching data for page:", currentPage); // 데이터 가져올 때 로그 추가
        if (data.results && data.results.length > 0) {
          setSearchResults(data.results);
          setTotalItems(data.totalItems); // 서버에서 총 아이템 수를 받는다고 가정
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, currentPage]); // currentPage가 변경될 때마다 데이터를 다시 불러옴

  const handleSortChange = (type: "hot" | "new") => {
    setCurrentPage(1); // 정렬 방식이 변경되면 페이지를 1로 초기화
  };

  return (
    <main className="h-auto max-w-[1920px] px-6 pt-9">
      <div className="mx-auto flex w-full max-w-[1313px] flex-col gap-[76px]">
        <ImageCardList />
        <SearchBar initialQuery={query} />
        <div className="flex justify-between gap-4">
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
              {searchResults.length > 0 ? (
                <MainPostCardList postData={searchResults} />
              ) : (
                <div className="m-10 flex">찾으시는 정보가 없습니다.</div>
              )}
            </div>
            {!session && (
              <div className="absolute left-1/2 top-0 z-10 flex h-[210px] w-[341px] -translate-x-1/2 translate-y-1/2 transform flex-col items-center justify-center gap-7 rounded-[20px] bg-white py-10 shadow-custom-shadow dark:border dark:border-primary-purple-500 dark:bg-custom-dark-bg">
                <p className="text-xl font-medium">
                  자세한 정보를 보고 싶다면?
                </p>
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

            {searchResults.length > 0 && (
              <VuldbPagination
                totalItems={totalItems}
                current={currentPage} // 현재 페이지 상태 전달
                setCurrent={setCurrentPage} // 상태 업데이트 함수 전달
                numberPerPage={ITEMS_PER_PAGE}
              />
            )}
          </section>
          <TopicList />
        </div>
      </div>
    </main>
  );
}
