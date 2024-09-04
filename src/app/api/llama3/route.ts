import { NextRequest, NextResponse } from 'next/server';
import { generateLlama3Response } from '@/lib/llama3';

export async function POST(req: NextRequest) {
  try {
    const { message, temperature, top_p } = await req.json();

    if (!message) {
      return NextResponse.json({ error: '메시지가 필요합니다.' }, { status: 400 });
    }

    const llama3Response = await generateLlama3Response(message, temperature, top_p);
    
    // 전체 응답을 한 번에 읽어오게 설정
    const responseText = await llama3Response.text();
    
    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('LLaMA3 처리 중 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}