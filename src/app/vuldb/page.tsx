import ImageCardList from "./_components/imageCard/ImageCardList";
import MainPostSection from "./_components/MainPostSection";
import SearchBar from "./_components/SearchBar";
import TopicList from "./_components/TopicList";

export default function VulnerabilityDb() {
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
