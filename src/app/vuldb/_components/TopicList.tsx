"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopicList() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [topicList, setTopicList] = useState<any[]>([]);

  const getCurrentTimeInKST = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Seoul",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // 24시간 형식
    };

    const formattedTime = new Intl.DateTimeFormat("ko-KR", options).format(now);
    return formattedTime;
  };

  const getSearch = async () => {
    try {
      const searchQuery = query(
        collection(db, "search"),
        orderBy("views", "desc"),
        limit(10),
      );

      const searchSnapshot = await getDocs(searchQuery);

      let searchData = searchSnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data()?.text || "-",
        views: doc.data()?.views || "-",
      }));

      while (searchData.length < 10) {
        searchData.push({
          id: `empty-${searchData.length + 1}`,
          text: "-",
          views: "-",
        });
      }

      setTopicList(searchData);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  useEffect(() => {
    setCurrentTime(getCurrentTimeInKST());
    getSearch();
  }, []);

  const LoadingSkeleton = () => {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      items.push(
        <li
          key={i}
          className="flex items-center border-b border-line-gray-10 py-4 font-medium text-custom-light-text dark:text-white"
        >
          <span className="mr-3 pt-[2px]">{i}.</span>
          <div className="h-6 w-[160px] animate-pulse rounded-lg bg-grayscale-10 dark:bg-grayscale-80"></div>
        </li>,
      );
    }

    return <ul className="text-lg">{items}</ul>;
  };

  return (
    <aside className="flex flex-col gap-4">
      <div className="mb-[36px] flex items-center justify-between">
        <h1 className="text-2xl font-semibold">실시간 Topic</h1>

        {currentTime ? (
          <p className="text-base font-medium text-[#B7B7B7]">
            {currentTime} 기준
          </p>
        ) : (
          <div className="h-6 w-[130px] animate-pulse rounded-lg bg-grayscale-10 dark:bg-grayscale-80"></div>
        )}
      </div>
      <div className="w-[328px] rounded-lg border border-line-default bg-white px-5 py-1 dark:bg-custom-light-bg dark:bg-opacity-5">
        <ul className="text-lg">
          {topicList.length > 0
            ? topicList.map((item, index) => (
                <li
                  key={item.id}
                  className={`flex items-center py-4 font-medium text-custom-light-text dark:text-white ${
                    index !== topicList.length - 1
                      ? "border-b border-line-gray-10"
                      : ""
                  }`}
                >
                  <span className="mr-3 pt-[2px]">{index + 1}.</span>
                  {item.text !== "-" ? (
                    <Link href={`/vuldb/search?query=${item.text}&page=1`}>
                      <span className="cursor-pointer hover:underline">
                        {item.text}
                      </span>
                    </Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))
            : LoadingSkeleton()}
        </ul>
      </div>
    </aside>
  );
}
