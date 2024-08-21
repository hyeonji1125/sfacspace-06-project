import ServiceCardsGrid from "./Card/ServiceCardsGrid";

export default function SecureProcessSection() {
  return (
    <section className="flex h-auto w-full flex-col justify-center bg-primary-purple-500 pb-10 pt-[120px] md:h-full">
      <div className="mb-[80px] flex justify-center px-[10%] text-center text-3xl font-bold text-white dark:text-custom-dark-text md:text-5xl xl:text-6xl">
        <p className="leading-snug tracking-[-1px]">
          안전과 보호를 우선으로 하는
          <br />
          프로세스를 제공합니다.
        </p>
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
