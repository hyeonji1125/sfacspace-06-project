'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';

import { InquiryForm } from '@/types';

export default function Inquiry() {
  const [formData, setFormData] = useState<InquiryForm>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-[800px] my-8 md:my-[103px] justify-between px-4 md:px-8 xl:px-20 2xl:px-0 gap-y-8 lg:gap-y-0 lg:gap-x-16">
      <div className="flex flex-col tracking-[-0.01em] text-center lg:text-left md:flex-grow">
        <div className="font-bold">
          <h2 className="text-2xl xl:text-[40px] 2xl:text-[50px] leading-tight lg:leading-[1.5] text-primary-purple-500 mb-4 lg:mb-[30px]">
            서비스이용에 <span className="hidden lg:inline"><br /></span>문제가 생겼나요?
          </h2>
          <p className="text-lg lg:text-[20px] font-medium text-text-gray-default">
            이용하면서 문제가 생겼다면 언제든지 문의주세요.<br />
            서비스 개발과 성장에 큰 도움이 됩니다.
          </p>
        </div>
        <div className="hidden lg:block mt-auto text-custom-light-text dark:text-gray-300 ">
          <div className="mb-[50px]">
            <p className='text-[20px]'>Email</p>
            <p className='text-[18px] text-text-gray-default'>justin@floatfactory.kr</p>
          </div>
          <div className="">
            <p className='text-[20px]'>Address</p>
            <p className='text-[18px] text-text-gray-default'>서울 강서구 마곡중앙로 11 305호</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[985px] border-[1.5px] border-primary-purple-500 dark:border-transparent rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] p-6 lg:p-10 xl:p-[60px] dark:bg-zinc-700">
        <div className="rounded-3xl tracking-[-0.01em] text-center lg:text-left leading-[1.5]">
          <h3 className="text-xl lg:text-[24px] mb-4 lg:mb-[32px]">문의하기</h3>
          <p className="text-[#8f8f8f] dark:text-gray-300 text-sm lg:text-[16px] font-medium mb-6 lg:mb-[32px]">문의하고싶은 내용을 구체적으로 작성해주셔야 피드백이 정상적으로 반영됩니다.</p>
          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-[32px] text-left">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-base lg:text-[18px] gray">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='dark:placeholder:text-gray-400'
                placeholder="이름을 적어주세요."
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-base lg:text-[18px]">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='dark:placeholder:text-gray-400'
                placeholder="justin@flawfactory.kr"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-base lg:text-[18px]">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="내용을 적어주세요."
                className='h-52 dark:placeholder:text-gray-400'
              />
            </div>

            <Button
              type="submit"
              theme="filled"
              size="large"
            >
              문의 보내기
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
