'use client'
import Button from "@/components/common/Button";
import { signIn } from "next-auth/react";

export const Login = () => {
  return (
    <Button onClick={() => signIn('github', { callbackUrl: "/"})} theme="filled" size="small" isRound>
      GitHub로 연동 로그인하기
    </Button>
  );
}
