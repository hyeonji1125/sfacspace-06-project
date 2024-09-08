"use client";

import UserPic from "@/components/common/UserPic";
import { useGetUser } from "@/hooks/useGetUser";

export default function UserItem() {
  const { status, user, name, image, email } = useGetUser();

  if (status === "loading") {
    return <p>loading...</p>;
  }

  return (
    <>
      {!user && <p>유저 데이터를 찾을 수 없습니다.</p>}
      {name && (
        <div className="flex items-center gap-11">
          <UserPic image={image ?? ""} name={name} />
          <p className="text-text-gray-dark flex flex-col text-[40px] font-medium leading-[1.2] tracking-tighter dark:text-custom-dark-text">
            <span>Hello,</span>
            <span>{email}</span>
          </p>
        </div>
      )}
    </>
  );
}
