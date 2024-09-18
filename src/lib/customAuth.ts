import { signOut } from "next-auth/react";

export const customSignOut = async (email: string, callbackUrl?: string) => {
  try {
    if (email) {
      await fetch("/api/user", {
        method: "DELETE",
        body: JSON.stringify({
          email,
        }),
      });

      console.log("User data deleted successfully");
    }
    await signOut({ callbackUrl });
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw error;
  }
};
