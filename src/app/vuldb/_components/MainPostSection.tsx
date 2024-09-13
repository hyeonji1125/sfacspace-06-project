"use client";

import Button from "@/components/common/Button";
import { PostDataType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchHotPosts, fetchNewPosts } from "../_utils/postDataManager";
import { updatePostChipsInDB } from "../_utils/updatePostChips";
import TagButton from "./button/TagButton";
import MainPostCardList from "./mainPostCard/MainPostCardList";
import Pagination from "./Pagination";

export default function MainPostSection() {
  const { data: session } = useSession();
  const [sortType, setSortType] = useState<"hot" | "new">("hot"); // hot,new 태그 정렬 관리
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 현재 페이지 번호 관리
  const [allPosts, setAllPosts] = useState<PostDataType[]>([]); // 전체 게시글 저장
  const [currentPosts, setCurrentPosts] = useState<PostDataType[]>([]); // 페이지네이션된 게시글 저장

  const ITEMS_PER_PAGE = 5; // 페이지당 게시글 수

  // Firebase에서 데이터를 가져오는 함수
  const fetchPosts = async () => {
    if (sortType === "hot") {
      const hotPosts = await fetchHotPosts();
      setAllPosts(hotPosts); // 조회순으로 정렬된 게시글 가져옴
    } else if (sortType === "new") {
      const newPosts = await fetchNewPosts();
      setAllPosts(newPosts); // 최신순으로 정렬된 게시글 가져옴
    }
  }; // allPosts에 전체 게시글 저장함

  // 페이지 로드 및 새로고침 시 칩 업데이트 및 게시글 가져오기
  useEffect(() => {
    const updateChipsAndFetchPosts = async () => {
      await updatePostChipsInDB(); // 칩 업데이트
      fetchPosts(); // 게시글 가져오기
    };
    updateChipsAndFetchPosts(); // 페이지 로드 및 새로고침 시 실행
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [sortType]); // sortType(hot, new) 정렬 버튼 클릭하면 변경되니까 정렬방식에 맞게 데이터 가져옴

  useEffect(() => {
    // 페이지네이션 적용
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; //시작 번호
    // 페이지가 2일 경우 1페이지당 5개씩 보여주는데 2페이지면 5번째부터 보여줘야함
    const endIndex = startIndex + ITEMS_PER_PAGE; // 끝 번호
    setCurrentPosts(allPosts.slice(startIndex, endIndex)); // 전체 게시글에서 현재 페이지에 맞는 게시글만 저장
  }, [allPosts, currentPage, ITEMS_PER_PAGE]);

  const handleSortChange = (type: "hot" | "new") => {
    setSortType(type);
    setCurrentPage(1); // 페이지를 1로 초기화
  };

  return (
    <section className="relative flex flex-col gap-4">
      <div
        className={`flex flex-col gap-4 ${!session ? "pointer-events-none blur-[10px]" : ""}`}
      >
        <div className="flex justify-between">
          <h1 className="text-[28px] font-semibold">취약점 DB</h1>
          <div className="mb-[29px] flex gap-3">
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
        </div>
        <MainPostCardList
          postData={currentPosts} // 페이지네이션된 게시글 전달
        />
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
      <Pagination
        totalItems={allPosts.length} // 전체 게시글 수
        setCurrent={setCurrentPage} // 현재 페이지 번호
        current={currentPage} // 현재 페이지 값
        numberPerPage={ITEMS_PER_PAGE} // 페이지당 게시글 수
      />
    </section>
  );
}
