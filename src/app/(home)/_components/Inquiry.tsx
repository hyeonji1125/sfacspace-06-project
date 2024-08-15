'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Inquiry() {
  const [formData, setFormData] = useState<FormData>({
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
    <div className="flex flex-col md:flex-row min-h-[817px] my-8 md:my-[103px] justify-between px-4 md:px-0">
      <div className="flex flex-col tracking-[-0.01em]">
        <div>
          <h2 className="text-3xl md:text-[60px] leading-tight md:leading-[1.5] text-primary-purple-500 text-left mb-4 md:mb-[30px]">서비스이용에 <span className="hidden md:inline"><br /></span>문제가 생겼나요?</h2>
          <p className="text-lg md:text-[20px] font-medium text-primary-gray-90">
            이용하면서 문제가 생겼다면 언제든지 문의주세요.<br />
            서비스 개발과 성장에 큰 도움이 됩니다.
          </p>
        </div>
        <div className="hidden md:block mt-auto">
          <div className="text-gray-600 mb-2">
            <p>Email</p>
            <p>justin@floatfactory.kr</p>
          </div>
          <div className="text-gray-600">
            <p>Address</p>
            <p>서울 강서구 마곡중앙로 11 305호</p>
          </div>
        </div>
      </div>

      <div className="w-full md:max-w-[985px] border-[1.5px] border-primary-purple-500 dark:border-transparent rounded-[20px] md:rounded-[40px] p-6 md:p-[60px] dark:bg-primary-gray-20">
        <div className="rounded-3xl tracking-[-0.01em] text-left leading-[1.5]">
          <h3 className="text-xl md:text-[24px] mb-4 md:mb-[32px]">문의하기</h3>
          <p className="text-primary-gray-80 text-sm md:text-[16px] font-medium mb-6 md:mb-[32px]">문의하고싶은 내용을 구체적으로 작성해주셔야 피드백이 정상적으로 반영됩니다.</p>
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-[32px]">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-base md:text-[18px]">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='dark:placeholder:text-primary-gray-80'
                placeholder="이름을 적어주세요."
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-base md:text-[18px]">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='dark:placeholder:text-primary-gray-80'
                placeholder="justin@flawfactory.kr"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-base md:text-[18px]">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="내용을 적어주세요."
                className='h-52 dark:placeholder:text-primary-gray-80'
              />
            </div>

            <button type="submit" className="w-full bg-primary-purple-500 text-white py-3 md:py-4 px-4 rounded-md text-base md:text-lg font-semibold">
              문의 보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
