"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass } from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function SearchBar({ initialQuery }: { initialQuery?: string }) {
  const [searchText, setSearchText] = useState(initialQuery || "");
  const [suggestions, setSuggestions] = useState<string[]>([]); // 추천어 목록 상태
  const [isFocused, setIsFocused] = useState(false); // 입력 필드 포커스 상태
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지를 위한 ref

  // 검색어를 저장하고, create_at 및 update_at 필드를 관리하는 함수
  const saveSearchKeyword = async (text: string): Promise<void> => {
    try {
      const searchRef = doc(collection(db, "search"), text); // 검색어를 key로 문서 참조
      const searchDoc = await getDoc(searchRef);

      if (searchDoc.exists()) {
        const currentViews = searchDoc.data().views || 0;
        await updateDoc(searchRef, {
          views: currentViews + 1,
          update_at: serverTimestamp(),
        });
      } else {
        await setDoc(searchRef, {
          text,
          views: 1,
          create_at: serverTimestamp(),
          update_at: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error saving search keyword:", error);
    } finally {
      setSearchText("");
    }
  };

  // 입력 변화에 따라 추천 검색어 불러오는 함수 (디바운스 포함)
  const fetchSuggestions = async (text: string) => {
    if (text.trim() === "") {
      setSuggestions([]);
      return;
    }

    const searchQuery = query(
      collection(db, "search"),
      orderBy("text"),
      startAt(text),
      endAt(text + "\uf8ff"),
    );

    const querySnapshot = await getDocs(searchQuery);
    const suggestionList: string[] = [];
    querySnapshot.forEach((doc) => {
      suggestionList.push(doc.data().text);
    });

    setSuggestions(suggestionList);
  };

  // 입력값 처리 함수 (디바운스 적용)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    // 디바운스 적용
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(text);
    }, 300); // 디바운스 : 300ms 대기 후 API 호출
  };

  // 검색 처리 함수
  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      await saveSearchKeyword(searchText); // 검색어 저장 및 카운트 업데이트
      router.push(
        `/vuldb/search?query=${encodeURIComponent(searchText)}&page=1`,
      );
      setSuggestions([]); // 검색 후 추천어 목록 비우기
    } else {
      alert("검색어 입력해주세요");
      return;
    }
  };

  // 엔터키 눌렀을 때 검색 처리
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // 추천 검색어 선택 시 검색어 자동 입력 및 검색 실행
  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  // 외부 클릭 감지
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]); // 외부 클릭 시 추천어 목록 숨기기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchBarRef}
      className="m-auto flex h-[82px] w-full flex-col items-center rounded-[14px] border border-primary-purple-500 p-6"
    >
      <div className="flex w-full items-center">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          name="search"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)} // 포커스 상태 설정
          className="mr-2 flex-grow border-none text-2xl font-medium outline-none"
        />
        <button onClick={handleSearch}>
          <MagnifyingGlass />
        </button>
      </div>

      {/* 추천어 목록 표시 */}
      {suggestions.length > 0 && isFocused && (
        <ul className="z-10 my-2 w-full rounded-md border border-gray-300 bg-white">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
