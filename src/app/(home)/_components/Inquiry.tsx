"use client";

import { useEffect } from "react";

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

import { InquiryForm } from "@/types";
import { useInquiryStore } from "@/store/useInquiryStore";
import { useSession } from "next-auth/react";

export default function Inquiry() {
  const { formData, isSubmitting, setFormData, submitForm } = useInquiryStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFormData("name", session.user.name || "");
      setFormData("email", session.user.email || "");
    } else if (status === "unauthenticated") {
      setFormData("name", "");
      setFormData("email", "");
    }
  }, [status, session, setFormData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(name as keyof InquiryForm, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

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

      <div className="w-full rounded-[40px] border-[1.5px] border-primary-purple-500 px-5 py-8 dark:border-transparent dark:bg-zinc-700 md:p-8 lg:max-w-[800px] lg:p-10 xl:max-w-[800px] xl:p-[40px] 2xl:max-w-[900px] 2xl:p-[60px]">
        <div className="rounded-3xl text-center leading-[1.5] tracking-[-0.01em] lg:text-left">
          <h3 className="mb-4 text-xl font-bold md:text-[22px] lg:mb-[32px] lg:text-[24px]">
            문의하기
          </h3>
          <p className="mb-6 text-sm font-medium text-[#8f8f8f] dark:text-gray-300 md:text-[15px] lg:mb-[32px] lg:text-[16px]">
            문의하고싶은 내용을 구체적으로 작성해주셔야{" "}
            <span className="inline lg:hidden">
              <br />
            </span>
            피드백이 정상적으로 반영됩니다.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 text-left md:space-y-4 lg:space-y-[32px]"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium md:text-[18px]"
              >
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="placeholder:text-sm dark:placeholder:text-gray-400 md:placeholder:text-base"
                placeholder="이름을 적어주세요."
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium md:text-[18px]"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="placeholder:text-sm dark:placeholder:text-gray-400 md:placeholder:text-base"
                placeholder="justin@flawfactory.kr"
                readOnly={status === "authenticated"}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium md:text-[18px]"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="내용을 적어주세요."
                className="h-40 placeholder:text-sm dark:placeholder:text-gray-400 md:h-48 md:placeholder:text-base lg:h-52"
              />
            </div>

            <Button
              type="submit"
              theme="filled"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "전송 중..." : "문의 보내기"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
