"use client";

import Button from "@/components/common/Button";
import UserPic from "@/components/common/UserPic";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserItem({
  buttonType = "LOGOUT",
}: {
  buttonType?: "LOGOUT" | "PROFILE";
}) {
  const { data, status } = useSession();
  const { user } = data ?? {};

  if (status === "loading") {
    return <p>loading...</p>;
  }

  let button;

  if (buttonType === "LOGOUT") {
    button = (
      <Button
        theme="outlined"
        size="small"
        className="border-2 border-primary-purple-500 py-4 font-normal md:py-4"
        onClick={() => signOut({ redirect: true, callbackUrl: "/mylibrary" })}
      >
        로그아웃
      </Button>
    );
  } else {
    button = (
      <Link
        href="/me"
        className="rounded-lg border-2 border-primary-purple-500 px-5 py-4 text-xl font-normal text-primary-purple-500 hover:bg-primary-purple-500/10 hover:shadow focus:bg-primary-purple-500/15"
      >
        프로필 정보
      </Link>
    );
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
          {button}
        </div>
      )}
    </>
  );
}
