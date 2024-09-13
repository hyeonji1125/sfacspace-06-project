import SearchBar from "../_components/SearchBar";

import SearchResult from "../_components/SearchResult";
import TopicList from "../_components/TopicList";

export default function VulnerabilityDb() {
  return (
    <main className="h-auto max-w-[1920px] px-6 py-9">
      <div className="mx-auto flex w-full max-w-[1313px] flex-col gap-[66px]">
        {/* <ImageCardList /> */}
        <div className="z-20">
          <SearchBar />
        </div>
        <div className="flex justify-between gap-4">
          <SearchResult />
          <TopicList />
        </div>
      </div>
    </main>
  );
}
