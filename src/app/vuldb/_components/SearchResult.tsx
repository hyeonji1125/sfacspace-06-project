"use client";

import Button from "@/components/common/Button";
import { PostDataType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import MainPostCardList from "../_components/mainPostCard/MainPostCardList";
import VuldbPagination from "../_components/VuldbPagiNation";

export default function SearchResult() {
  const { data: session } = useSession();
  const [searchResults, setSearchResults] = useState<PostDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // 페이지 상태 관리
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const ITEMS_PER_PAGE = 5;
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
        // console.log("page.tsx", data);
        // console.log("Fetching data for page:", currentPage); // 데이터 가져올 때 로그 추가
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

  return (
    <section className="relative flex w-full flex-col gap-4">
      <div
        className={`flex flex-col gap-4 ${!session ? "pointer-events-none blur-[10px]" : ""}`}
      >
        {searchResults.length > 0 ? (
          <>
            <div className="mb-[45px] flex cursor-pointer flex-row items-center gap-3">
              <Link href={"/vuldb"}>
                <IoIosArrowBack className="h-[31px] w-[31px] text-gray-300" />
              </Link>
              <h1 className="text-2xl font-semibold">검색결과: {query}</h1>
            </div>
            <MainPostCardList postData={searchResults} />
          </>
        ) : (
          <div className="mt-[200px] flex w-full flex-col items-center gap-4">
            <h1 className="text-3xl font-semibold">
              검색 결과가 존재하지 않습니다.
            </h1>
            <p className="text-xl text-gray-400">
              다른 주제로 다시 검색해 보세요.
            </p>
          </div>
        )}
      </div>
      {!session && (
        <div className="absolute left-1/2 top-0 z-10 flex h-[210px] w-[341px] -translate-x-1/2 translate-y-1/2 transform flex-col items-center justify-center gap-7 rounded-[20px] bg-white py-10 shadow-custom-shadow dark:border dark:border-primary-purple-500 dark:bg-custom-dark-bg">
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

      {session && searchResults.length > 0 && (
        <VuldbPagination
          totalItems={totalItems}
          current={currentPage} // 현재 페이지 상태 전달
          setCurrent={setCurrentPage} // 상태 업데이트 함수 전달
          numberPerPage={ITEMS_PER_PAGE}
        />
      )}
    </section>
  );
}
