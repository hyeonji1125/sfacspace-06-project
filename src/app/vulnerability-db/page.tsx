import ImageCardList from "./_components/imageCard/ImageCardList";
import MainPostSection from "./_components/MainPostSection";
import TopicList from "./_components/TopicList";

export default function VulnerabilityDb() {
  return (
    <main className="mx-auto h-auto max-w-[1920px] pt-9">
      <div className="flex w-full flex-col gap-[76px]">
        <ImageCardList />
        <div className="flex justify-between px-3">
          <MainPostSection />
          <TopicList />
        </div>
      </div>
    </main>
  );
}
