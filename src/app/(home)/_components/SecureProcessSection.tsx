import ServiceCardsGrid from "./Card/ServiceCardsGrid";

export default function SecureProcessSection() {
  return (
    <div className="flex h-[1024px] w-full flex-col justify-center bg-primary-purple-500 pt-[100px] dark:bg-custom-dark-bg">
        <div className="mb-[80px] flex justify-center text-center text-4xl font-bold leading-[50px] text-white dark:text-custom-dark-text md:text-6xl md:leading-[73px]">
          안전과 보호를 우선으로 하는
          <br />
          프로세스를 제공합니다.
        </div>
      <div className="relative flex h-[420px] w-full overflow-hidden md:h-[550px]">
        <div className="animate-rotateForward absolute z-[1] flex">
          <ServiceCardsGrid />
        </div>
        <div className="animate-rotateBackward absolute z-[1] flex">
          <ServiceCardsGrid />
        </div>
      </div>
    </div>
  );
}
