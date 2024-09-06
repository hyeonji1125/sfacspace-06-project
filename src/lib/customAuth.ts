import { signOut } from "next-auth/react";
import { deleteCollection, deleteData } from "@/hooks/fetchData";

export const customSignOut = async (email: string, callbackUrl?: string) => {
  try {
    if (email) {
      await deleteCollection(`users/${email}/repos`);
      await deleteData("users", email);

      console.log("User data deleted successfully");
    }
    await signOut({ callbackUrl });
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw error;
  }
};
