"use client";
import { useState } from "react";
import { MagnifyingGlass } from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log("검색어:", searchText);
  };

  return (
    <div className="m-auto flex h-[82px] w-full items-center rounded-[14px] border border-primary-purple-500 p-6">
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        name="search"
        value={searchText}
        onChange={handleInputChange}
        className="mr-2 flex-grow border-none p-2 text-2xl font-medium outline-none"
      />
      <button onClick={handleSearch}>
        <MagnifyingGlass />
      </button>
    </div>
  );
}
