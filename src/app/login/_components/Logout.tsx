'use client'
import Button from "@/components/common/Button";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: '/login' })}
      theme="filled"
      size="small"
      isRound
    >
      로그아웃
    </Button>
  )
}