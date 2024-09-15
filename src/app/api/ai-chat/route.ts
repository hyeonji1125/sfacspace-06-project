import { NextRequest, NextResponse } from "next/server";
import { AIChatbotResponse } from "@/lib/llama3";

export async function POST(req: NextRequest) {
  try {
    const { question, post, temperature, top_p } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "질문을 입력해주세요." },
        { status: 400 },
      );
    }

    const llama3Response = await AIChatbotResponse(
      question,
      post,
      temperature,
      top_p,
    );

    console.log(llama3Response);

    return NextResponse.json({ response: llama3Response });
  } catch (error) {
    console.error("LLaMA3 처리 중 오류:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
