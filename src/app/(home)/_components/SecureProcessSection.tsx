import ServiceCardsGrid from "./Card/ServiceCardsGrid";

export default function SecureProcessSection() {
  return (
    <section className="flex h-full w-full flex-col justify-center bg-primary-purple-500 pt-[100px] md:h-[900px]">
      <div className="mb-[80px] flex justify-center px-[10%] text-center text-2xl font-bold leading-[35px] text-white dark:text-custom-dark-text sm:text-4xl md:text-5xl md:leading-[49px] xl:text-6xl xl:leading-[73px]">
        안전과 보호를 우선으로 하는
        <br />
        프로세스를 제공합니다.
      </div>
      <div className="relative flex h-[420px] w-full overflow-hidden md:h-[550px]">
        <div className="absolute z-[1] flex animate-rotateForward">
          <ServiceCardsGrid />
        </div>
        <div className="absolute z-[1] flex animate-rotateBackward">
          <ServiceCardsGrid />
        </div>
      </div>
    </section>
  );
}
