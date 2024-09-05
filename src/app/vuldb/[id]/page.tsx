// "use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ImageCardList from "../_components/imageCard/ImageCardList";
import MainPostSection from "../_components/MainPostSection";
import SearchBar from "../_components/SearchBar";
import TopicList from "../_components/TopicList";

export default async function VulnerabilityDb({ params }: { params: Params }) {
  const res = await fetch(`http://localhost:3000/api/vuldb?query=${params.id}`);

  // 응답이 성공적이지 않을 경우 처리
  if (!res.ok) {
    const errorText = await res.text(); // 에러일 경우 HTML 응답일 수 있음
    console.error("Error:", errorText);
    throw new Error(`Error: ${res.status}`); // 오류 처리
  }

  // 정상 응답일 경우 JSON 파싱
  const data = await res.json();
  console.log(data);
  return (
    <main className="h-auto max-w-[1920px] px-6 pt-9">
      <div className="mx-auto flex w-full max-w-[1313px] flex-col gap-[76px]">
        <ImageCardList />
        <SearchBar />
        <div className="flex justify-between gap-4">
          <MainPostSection />
          <TopicList />
        </div>
      </div>
    </main>
  );
}
