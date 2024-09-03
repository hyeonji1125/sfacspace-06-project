"use client";

import UserPic from "@/components/common/UserPic";
import { useSession } from "next-auth/react";

export default function UserItem() {
  const { data, status } = useSession();
  const { user } = data ?? {};

  if (status === "loading") {
    return <p>loading...</p>;
  }

  return (
    <>
      {!user && <p>유저 데이터를 찾을 수 없습니다.</p>}
      {user && user.name && (
        <div className="flex items-center gap-11">
          <UserPic image={user?.image ?? ""} name={user.name} />
          <p className="flex flex-col text-[40px] font-medium leading-[1.2] tracking-tighter text-text-gray-dark dark:text-custom-dark-text">
            <span>Hello,</span>
            <span>{user?.email}</span>
          </p>
        </div>
      )}
    </>
  );
}
