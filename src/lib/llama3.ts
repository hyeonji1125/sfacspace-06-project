/* 추후 삭제 */
console.log('LLAMA3_API_URL:', process.env.LLAMA3_API_URL);
console.log('LLAMA3_USERNAME:', process.env.LLAMA3_USERNAME);
console.log('LLAMA3_PASSWORD:', process.env.LLAMA3_PASSWORD);

if (!process.env.LLAMA3_API_URL || !process.env.LLAMA3_USERNAME || !process.env.LLAMA3_PASSWORD) {
  throw new Error('환경 변수 설정 해주세요 !!');
}

async function getAuthToken() {
  const formData = new URLSearchParams();
  formData.append('username', process.env.LLAMA3_USERNAME || '');
  formData.append('password', process.env.LLAMA3_PASSWORD || '');

  const authResponse = await fetch(`${process.env.LLAMA3_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!authResponse.ok) {
    const errorBody = await authResponse.text();
    console.error('Auth Response:', authResponse.status, errorBody);
    throw new Error(`LLaMA3 인증 실패: ${authResponse.status} ${errorBody}`);
  }

  const { access_token } = await authResponse.json();
  return access_token;
}

/*
temperature : 다양성 조절 
top_p : 단어 누적 확률 범위 조절
*/
export async function generateLlama3Response(userMessage: string, temperature = 0.7, top_p = 0.9) {
  const token = await getAuthToken();

  // 프롬프트 정하고 여기에 작성 !
  const prompt = `질문에 대해 친절하고 정확하게 한국어로 답변해 주세요.

사용자: ${userMessage}

AI 어시스턴트: `;

  const response = await fetch(`${process.env.LLAMA3_API_URL}/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_message: prompt,
      temperature,
      top_p,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LLaMA3 API 응답 오류: ${response.status} ${errorBody}`);
  }

  return response;
}