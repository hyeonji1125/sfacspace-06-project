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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass } from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function SearchBar({ initialQuery }: { initialQuery?: string }) {
  const [searchText, setSearchText] = useState(initialQuery || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchText(query);
    }
  }, [searchParams]);

  const saveSearchKeyword = async (text: string): Promise<void> => {
    try {
      const searchRef = doc(collection(db, "search"), text);
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
    }
  };

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(text);
    }, 300);
  };

  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      await saveSearchKeyword(searchText);
      router.push(
        `/vuldb/search?query=${encodeURIComponent(searchText)}&page=1`,
      );
      setSuggestions([]);
    } else {
      alert("검색어 입력해주세요");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
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
            onFocus={() => setIsFocused(true)}
            className="mr-2 flex-grow border-none text-2xl font-medium outline-none"
          />
          <button onClick={handleSearch}>
            <MagnifyingGlass />
          </button>
        </div>
      </div>
      {suggestions.length > 0 && isFocused && (
        <ul className="absolute top-[72px] z-10 w-full rounded-b-[14px] border border-primary-purple-500 border-t-purple-200 bg-white">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex h-[70px] cursor-pointer items-center border border-t-primary-purple-200 pl-6 text-2xl font-medium text-gray-400 hover:bg-gray-200 ${
                index === suggestions.length - 1 ? "rounded-b-[14px]" : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
