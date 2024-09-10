"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link"; // next/link 추가
import { useEffect, useState } from "react";

export default function TopicList() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [topicList, setTopicList] = useState<any[]>([]); // Firestore에서 가져온 데이터 저장

  // 현재 한국 시간(KST)을 포맷하는 함수
  const getCurrentTimeInKST = () => {
    const now = new Date();

    // 한국 시간으로 변환 (KST, UTC+9)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Seoul",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedTime = new Intl.DateTimeFormat("ko-KR", options).format(now);
    return formattedTime;
  };

  // Firestore에서 search 컬렉션의 데이터를 가져오는 함수
  const getSearch = async () => {
    try {
      // Firestore에서 "search" 컬렉션을 참조하고 조회수 기준 내림차순으로 정렬, 최대 10개의 문서만 가져옴
      const searchQuery = query(
        collection(db, "search"),
        orderBy("views", "desc"), // 조회수 기준 내림차순 정렬
        limit(10),
      );

      // 쿼리 실행하여 문서 가져오기
      const searchSnapshot = await getDocs(searchQuery);

      // 문서 데이터를 추출하여 배열로 변환, 문서 ID 포함
      let searchData = searchSnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data()?.text || "-", // 필드가 없으면 기본값 "-"
        views: doc.data()?.views || "-", // 필드가 없으면 기본값 "-"
      }));

      // 10개 미만인 경우 나머지를 "-"로 채움
      while (searchData.length < 10) {
        searchData.push({
          id: `empty-${searchData.length + 1}`, // 고유한 ID 부여 (임시)
          text: "-", // 빈 데이터
          views: "-", // 빈 데이터
        });
      }

      // 가져온 데이터를 state에 저장
      setTopicList(searchData);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  // 컴포넌트가 마운트될 때 현재 시간 설정 및 Firestore 데이터 가져오기
  useEffect(() => {
    setCurrentTime(getCurrentTimeInKST());
    getSearch(); // Firestore에서 데이터 가져오기
  }, []);

  return (
    <aside className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">실시간 Topic</h1>
      <p className="text-lg font-medium text-text-gray-default">
        {currentTime} 기준
      </p>
      <div className="w-[346px] rounded-lg border border-line-default bg-white p-5 dark:bg-custom-light-bg dark:bg-opacity-5">
        <ul className="text-lg">
          {topicList.length > 0 ? (
            topicList.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center border-b border-line-gray-10 py-4 font-medium text-custom-light-text dark:text-white"
              >
                <span className="mr-3 pt-[2px]">{index + 1}.</span>{" "}
                {/* 순서 표시 */}
                {/* 텍스트에 링크 추가 및 호버 시 밑줄 */}
                {item.text !== "-" ? (
                  <Link href={`/vuldb/search?query=${item.text}&page=1`}>
                    <span className="cursor-pointer hover:underline">
                      {item.text}
                    </span>
                  </Link>
                ) : (
                  <span>{item.text}</span>
                )}
                {/* Firestore 데이터의 views 필드 표시 */}
              </li>
            ))
          ) : (
            <li className="py-4">로딩 중...</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
