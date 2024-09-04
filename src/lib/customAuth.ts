import { signOut } from "next-auth/react";
import { deleteData } from "@/hooks/fetchData";

export const customSignOut = async (email: string, callbackUrl?: string) => {
  try {
    if (email) {
      Promise.resolve().then(() => {
        deleteData('users', email)
          .then(() => {
            console.log('User data deleted successfully');
          })
          .catch(error => {
            console.error("Failed to delete user data:", error);
          });
      });
    }
    await signOut({ callbackUrl });
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw error;
  }
};