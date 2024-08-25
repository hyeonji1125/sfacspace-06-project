"use client";

import Button from "@/components/common/Button";
import UserPic from "@/components/common/UserPic";
import { signOut, useSession } from "next-auth/react";

export default function UserItem() {
  const { data, status } = useSession();
  const { user } = data ?? {};

  if (status === "loading") {
    return <p>loading...</p>;
  }

  return (
    <>
      {!user && <p>유저 데이터를 찾을 수 없습니다.</p>}
      {user && user.image && user.name && (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-11">
            <UserPic image={user.image} name={user.name} />
            <p className="flex flex-col text-[40px] font-medium leading-[1.2] tracking-tighter text-text-gray-dark dark:text-custom-dark-text">
              <span>Hello,</span>
              <span>{user?.email}</span>
            </p>
          </div>
          <Button
            theme="outlined"
            size="small"
            className="border-2 border-primary-purple-500 font-normal"
            onClick={() => signOut()}
          >
            로그아웃
          </Button>
        </div>
      )}
    </>
  );
}
