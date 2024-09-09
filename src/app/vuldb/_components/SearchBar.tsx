"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlass } from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function SearchBar({ initialQuery }: { initialQuery?: string }) {
  const [searchText, setSearchText] = useState(initialQuery || "");
  const router = useRouter();

  // 검색어를 저장하고, create_at 및 update_at 필드를 관리하는 함수
  const saveSearchKeyword = async (text: string): Promise<void> => {
    try {
      const searchRef = doc(collection(db, "search"), text); // 검색어를 key로 문서 참조
      const searchDoc = await getDoc(searchRef);

      if (searchDoc.exists()) {
        // 이미 존재하는 검색어 -> 카운트 증가 및 update_at 시간 업데이트
        const currentViews = searchDoc.data().views || 0;
        await updateDoc(searchRef, {
          views: currentViews + 1, // 카운트 증가
          update_at: serverTimestamp(), // 마지막 검색 시간 업데이트
        });
      } else {
        // 검색어가 존재하지 않음 -> 새로 추가 (create_at, update_at 포함)
        await setDoc(searchRef, {
          text,
          views: 1, // 조회수를 1로 설정
          create_at: serverTimestamp(), // 첫 검색 시간 기록
          update_at: serverTimestamp(), // 최신 검색 시간 기록
        });
      }
    } catch (error) {
      console.error("Error saving search keyword:", error);
    } finally {
      setSearchText("");
    }
  };

  // 입력값 처리 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // 검색 처리 함수
  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      await saveSearchKeyword(searchText); // 검색어 저장 및 카운트 업데이트
      // 검색어가 입력되었을 때 쿼리스트링에 검색어 전달하며 페이지 이동
      router.push(
        `/vuldb/search?query=${encodeURIComponent(searchText)}&page=1`,
      );
    }
  };

  // 엔터키 눌렀을 때 검색 처리
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="m-auto flex h-[82px] w-full items-center rounded-[14px] border border-primary-purple-500 p-6">
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        name="search"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="mr-2 flex-grow border-none p-2 text-2xl font-medium outline-none"
      />
      <button onClick={handleSearch}>
        <MagnifyingGlass />
      </button>
    </div>
  );
}
