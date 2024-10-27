import { deleteUserData } from "@/utils/deleteUserData";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    await deleteUserData(email);

    return NextResponse.json({ response: "Delete user data successfully." });
  } catch (error) {
    console.error("Failed to delete user data:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
