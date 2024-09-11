import { NextRequest, NextResponse } from "next/server";
import { analysisLlama3Response } from "@/lib/llama3";

export async function POST(req: NextRequest) {
  try {
    const { fileContents, temperature, top_p } = await req.json();

    if (
      !fileContents ||
      !Array.isArray(fileContents) ||
      fileContents.length === 0
    ) {
      return NextResponse.json(
        { error: "파일 내용이 필요합니다." },
        { status: 400 },
      );
    }

    const llama3Response = await analysisLlama3Response(
      fileContents,
      temperature,
      top_p,
    );

    return NextResponse.json({ response: llama3Response });
  } catch (error) {
    console.error("LLaMA3 처리 중 오류:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
