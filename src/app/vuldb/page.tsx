import PcOnlyMessage from "@/components/common/PcOnlyMessage";
import { Suspense } from "react";
import MainPostSection from "./_components/MainPostSection";
import SearchBar from "./_components/SearchBar";
import TopicList from "./_components/TopicList";
import ImageCardList from "./_components/imageCard/ImageCardList";

export default function VulnerabilityDb() {
  return (
    <>
      <PcOnlyMessage />
      <main className="hidden h-auto max-w-[1920px] px-6 py-9 xl:block">
        <div className="mx-auto flex w-full max-w-[1313px] flex-col gap-[66px]">
          <ImageCardList />
          <Suspense fallback={<div>로딩중..</div>}>
            <SearchBar />
          </Suspense>
          <div className="flex w-full justify-between">
            <div className="relative w-[70%]">
              <MainPostSection />
            </div>
            <div className="w-[25%]">
              <TopicList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
