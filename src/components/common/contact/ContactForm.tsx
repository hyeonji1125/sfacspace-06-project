"use client";

import { useInquiryStore } from "@/store/useInquiryStore";
import Button from "../Button";
import Input from "../Input";
import Textarea from "../Textarea";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { InquiryForm } from "@/types";
import { validateForm } from "@/utils/validateForm";

export default function ContactForm() {
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
    e.target.setCustomValidity("");
    e.target.reportValidity();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validateForm(e);

    if (!isFormValid) return;

    await submitForm();

    if (status === "unauthenticated") {
      setFormData("name", "");
      setFormData("email", "");
    }
  };

  return (
    <div className="w-full rounded-[40px] border-[1.5px] border-primary-purple-500 px-5 py-8 dark:border-transparent dark:bg-zinc-700 md:p-8 lg:max-w-[800px] lg:p-10 xl:max-w-[800px] xl:p-[40px] 2xl:max-w-[900px] 2xl:p-[60px]">
      <div className="rounded-3xl text-center leading-[1.5] tracking-[-0.01em] lg:text-left">
        <h3 className="mb-4 text-xl font-bold md:text-[22px] lg:mb-[32px] lg:text-[24px]">
          문의하기
        </h3>
        <p className="mb-6 text-sm font-normal text-[#8f8f8f] dark:text-gray-300 md:text-[15px] lg:mb-[32px] lg:text-[16px]">
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
              disabled={status === "authenticated"}
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
  );
}
