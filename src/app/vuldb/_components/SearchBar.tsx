"use client";

import { postSearch } from "@/hooks/fetchData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlass } from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async () => {
    if (searchText.trim()) {
      // Firestore에 검색어를 저장
      const result = await postSearch("search", searchText);
      if (result.success) {
        console.log("Search term saved successfully:", searchText);
        // 검색어가 성공적으로 저장되면 검색 페이지로 이동
        console.log("검색어:", searchText);
        router.push(`/vuldb/search?query=${encodeURIComponent(searchText)}`);
      } else {
        console.error(result.message);
      }
    }
  };

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
