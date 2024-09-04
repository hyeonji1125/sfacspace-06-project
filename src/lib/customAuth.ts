import { signOut } from "next-auth/react";
import { deleteData } from "@/hooks/fetchData";

export const customSignOut = async (email: string, callbackUrl?: string) => {
  try {
    if (email) {
      // Firestore에서 사용자 문서 삭제
      await deleteData('users', email);
    }
    // NextAuth 로그아웃
    await signOut({ callbackUrl });
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw error; 
  }
};