import ContactForm from "@/components/common/ContactForm";

export default function Inquiry() {
  return (
    <section className="flex min-h-[800px] w-full flex-col justify-between gap-x-10 gap-y-10 px-6 pb-[80px] pt-[100px] sm:px-8 md:px-[60px] lg:flex-row lg:gap-x-16 lg:gap-y-0 lg:px-[80px] xl:px-[90px] 2xl:px-[190px]">
      <div className="flex flex-shrink-0 flex-col text-center tracking-[-0.01em] md:flex-grow lg:text-left">
        <div className="font-bold">
          <h2 className="mb-7 text-3xl !leading-snug text-primary-purple-500 md:mb-[25px] md:text-5xl lg:mb-[30px] 2xl:text-6xl">
            서비스이용에 <br />
            문제가 생겼나요?
          </h2>
          <p className="text-sm font-medium !leading-normal text-text-gray-default md:text-base 2xl:text-xl">
            이용하면서 문제가 생겼다면 언제든지 문의주세요.
            <br />
            서비스 개발과 성장에 큰 도움이 됩니다.
          </p>
        </div>
        <div className="mt-auto hidden text-custom-light-text dark:text-gray-300 lg:block">
          <div className="mb-[50px]">
            <p className="text-[20px]">Email</p>
            <p className="text-[18px] text-text-gray-default">
              justin@floatfactory.kr
            </p>
          </div>
          <div className="">
            <p className="text-[20px]">Address</p>
            <p className="text-[18px] text-text-gray-default">
              서울 강서구 마곡중앙로 11 305호
            </p>
          </div>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
