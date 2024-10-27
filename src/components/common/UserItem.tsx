"use client";

import UserPic from "@/components/common/UserPic";
import { useGetUser } from "@/hooks/useGetUser";

export default function UserItem() {
  const { status, user, name, image, email } = useGetUser();

  if (status === "loading") {
    return (
      <div className="flex animate-pulse items-center gap-11">
        <div className="h-[107px] w-[107px] rounded-full bg-grayscale-10 dark:bg-grayscale-80" />
        <div className="flex flex-col gap-4">
          <div className="h-10 w-24 rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
          <div className="h-10 w-80 rounded-xl bg-grayscale-10 dark:bg-grayscale-80" />
        </div>
      </div>
    );
  }

  return (
    <>
      {!user && <p>유저 데이터를 찾을 수 없습니다.</p>}
      {name && (
        <div className="flex items-center gap-11">
          <UserPic image={image ?? ""} name={name} />
          <p className="flex flex-col text-[40px] font-medium leading-[1.2] tracking-tighter text-text-gray-dark dark:text-custom-dark-text">
            <span>Hello,</span>
            <span>{email}</span>
          </p>
        </div>
      )}
    </>
  );
}
