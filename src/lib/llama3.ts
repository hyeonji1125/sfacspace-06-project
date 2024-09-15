import { ChatMessage } from "@/types/chatbot";
import filename2prism from "filename2prism";

// 환경 변수 검증 함수
function checkEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`환경 변수 ${name}이(가) 설정되지 않았습니다.`);
  }
  return value;
}

// JSON 문자열을 정리하는 함수
function sanitizeJsonString(str: string) {
  let result = str.replace(/[\n\r\t]/g, "");

  result = result.replace(/(?<!\\)(?:\\\\)*\\/g, (match) => match + "\\");

  return result;
}

// JSON 파싱 시 실패할 경우 부분적으로 파싱 시도 함수
function attemptPartialParsing(responseText: string): any[] {
  const results = [];
  const regex = /{[^{}]*}/g;
  let match;
  while ((match = regex.exec(responseText)) !== null) {
    try {
      const obj = JSON.parse(match[0]);
      if (obj.title && obj.description && obj.suggestion) {
        results.push(obj);
      }
    } catch (e) {
      // 개별 객체 파싱 실패 시 무시
    }
  }
  return results;
}

// 파일명에서 프로그래밍 언어를 추출하는 함수 (filename2prism 라이브러리 사용)
function getLanguageFromFileName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const customMapping: { [key: string]: string } = {
    tsx: "typescript",
    jsx: "javascript",
  };

  if (extension && customMapping[extension]) return customMapping[extension];

  const languages = filename2prism(fileName);
  return Array.isArray(languages) && languages.length > 0
    ? languages[0]
    : "unknown";
}

// 인증 토큰을 가져오는 함수
async function getAuthToken() {
  const formData = new URLSearchParams();
  formData.append("username", checkEnvVar("LLAMA3_USERNAME"));
  formData.append("password", checkEnvVar("LLAMA3_PASSWORD"));

  const response = await fetch(`${checkEnvVar("LLAMA3_API_URL")}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LLaMA3 인증 실패: ${response.status} ${errorBody}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

/*
temperature : 다양성 조절 
top_p : 단어 누적 확률 범위 조절
*/

// LLaMA3 응답을 분석하는 함수
async function analyzeFile(
  file: { name: string; content: string },
  token: string,
  temperature: number,
  top_p: number,
) {
  const detectedLanguage = getLanguageFromFileName(file.name);

  const prompt = `우리는 한국어 문화권의 사용자가 전달한 코드를 분석하고, 코드 내부에 있는 보안 취약점을 찾아 개선 방안을 제안하는 서비스를 제공하고 있습니다. 사용자가 전달한 위의 code를 분석해 단락별로 취약점을 찾아주세요. 그리고 아래의 조건에 맞게 취약점 분석 내용을 한국어 답변으로 번역하여 보내주세요. 

조건 1: 답변은 무조건 한국어와 프로그래밍 언어로만 이루어져야 합니다. 한국어로 번역된 답변을 보내주세요. 예외 조건이 있는 경우에만 영어 답변을 허용합니다.

조건 2: 모든 코드에서 반드시 취약점을 찾아내야 하는 것은 아닙니다. 마크다운 문서 등 보안과 관련이 없는 코드일 경우 취약점 없음으로 판단하여 빈 객체를 반환합니다.

조건 3: 찾아내는 취약점은 보안과 관련된 취약점에 한정됩니다. 다른 종류의 취약점은 찾지 않습니다. 보편적인 보안 취약점이 없는 코드의 경우 취약점 없음으로 판단하여 빈 객체를 반환합니다.

조건 4: 답변은 JSON 형식의 배열로 보내며, 배열 내부의 각 객체는 하나의 취약점을 나타냅니다.

조건 5: 취약점 없음으로 판단한 경우, 취약점 객체를 생성하지 않으며 내부 아이템이 없는 빈 객체를 반환합니다.

아래 조건 6부터는 취약점을 발견했을 경우에만 유효한 조건입니다. 취약점 없음일 경우 빈 객체를 반환하고 아래 조건을 무시합니다. 

조건 6: 취약점이 있는 코드 단락이 존재할때마다 하나의 배열 아이템을 가지게 됩니다. 예를들어 찾아낸 취약점이 5개일 경우 답변 배열 내부의 취약점 객체 아이템은 5개가 됩니다. 

조건 7: 취약점 객체는 title, vulnerabilityCode, description, suggestion 프로퍼티를 가집니다. 취약점 객체 아이템은 아래의 형식을 따른다. 
{ 
   title: “취약점 이름(영어)”, 
   vulnerabilityCode: “취약점을 발견한 코드 단락(프로그래밍 언어)”, 
   description: “취약점 설명, 위험성, 문제점, 수정 방안에 대한 설명(한국어)”, 
   suggestion: “취약점을 개선한 코드(프로그래밍 언어)” 
}

조건 8: title은 해당 코드 단락의 취약점에 대해 짧게 요약한 제목입니다. 취약점을 핵심적으로 설명한 Phrase를 title로 합니다. 예외적으로 영어 답변을 전달해야 하는 프로퍼티로, 명확한 영어 phrase를 전달해주세요.

조건 9: language는 전달받은 파일의 확장자를 기반으로 자동으로 감지된 프로그래밍 언어입니다. 이 코드의 language는 '${detectedLanguage}'입니다. 이 값을 그대로 사용해주세요.

조건 10: vulnerabilityCode는 취약점을 발견한 코드 단락 부분을 원문 그대로 가져옵니다. 코드의 구성이 A, B, C로 되어있고 B 부분에서 취약점을 발견했다면 B에 해당하는 코드 전체를 전달합니다. 

조건 11: description은 발견한 취약점에 대한 상세한 설명입니다. 해당 코드 단락에서 어떤 부분이 보안 취약성을 가지고 있는지, 이 취약점은 어떤 것인지에 대한 설명과 함께 위험한 이유는 무엇인지, 어떤 방식으로 수정하는 것이 권장되는지에 대한 설명을 상세하게 한국어로 답변합니다. 

조건 12: suggestion은 description에서 설명한 권장된 수정 방법에 따라 vulnerabilityCode를 개선한 코드입니다. 기존에 전달받았던 code의 프로그래밍 언어를 사용해 수정 코드를 제안해야 합니다. 줄글로 된 설명문이 아닌 프로그래밍 언어로 개선된 코드를 전달해야 합니다. 만약 제안 코드 내부에 주석 설명이 필요한 경우, 한국어를 사용합니다.

조건 13: 코드(vulnerabilityCode, suggestion)는 이스케이프 처리해야 합니다.

파일명: ${file.name}
코드:
${file.content}

위 코드를 분석하고, 발견된 모든 취약점에 대해 지정된 JSON 형식으로 답변을 작성해주세요. suggestion은 꼭 수정이 필요한 코드 부분만 포함하고, 추가 설명 없이 코드만 제시해주세요. 코드는 일반 텍스트로 작성하되, 들여쓰기와 줄바꿈을 정확히 유지해주세요.`;

  const response = await fetch(`${checkEnvVar("LLAMA3_API_URL")}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_message: prompt, temperature, top_p }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LLaMA3 API 응답 오류: ${response.status} ${errorBody}`);
  }

  const responseText = await response.text();

  // 응답이 비어있는 경우 처리
  if (!responseText.trim() || responseText.trim() === "[]") return null;

  try {
    const sanitizedResponse = sanitizeJsonString(responseText);
    const parsedResponse = JSON.parse(sanitizedResponse);

    if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
      return {
        fileName: file.name,
        language: detectedLanguage,
        isVulnerable: true,
        analysis: parsedResponse,
      };
    } else if (typeof parsedResponse === "object" && parsedResponse !== null)
      return {
        fileName: file.name,
        language: detectedLanguage,
        isVulnerable: true,
        analysis: [parsedResponse],
      };
    else return null;
  } catch (error) {
    const partialAnalysis = attemptPartialParsing(responseText);
    return partialAnalysis.length > 0
      ? {
          fileName: file.name,
          language: detectedLanguage,
          isVulnerable: true,
          analysis: partialAnalysis,
        }
      : null;
  }
}

// 메인 분석 함수
export async function analysisLlama3Response(
  fileContents: { name: string; content: string }[],
  temperature = 0.7,
  top_p = 0.9,
) {
  const token = await getAuthToken();

  const results = await Promise.all(
    fileContents.map((file) => analyzeFile(file, token, temperature, top_p)),
  );

  // 취약점이 없는 파일을 필터링
  return results.filter((result) => result !== null);
}

// chatbot
export const AIChatbotResponse = async (
  question: string,
  post: string,
  temperature: number,
  top_p: number,
) => {
  const token = await getAuthToken();

  const prompt = `
post: ${post}
question: ${question}
우리는 한국어 문화권의 사용자에게 보안 취약점에 대한 아티클을 제공하고, 해당 아티클과 관련된 사용자의 궁금증을 해결하는 서비스를 제공하고 있습니다. 위의 post는 우리가 제공한 보안 취약점 아티클의 내용입니다. question은 post를 읽고 사용자가 전달한 질문입니다. 사용자의 질문에 대해 아래 조건을 충족하여 답변해주세요.
조건: 
1. 답변은 무조건 한국어로 번역하여 전달한다. 
1-1. 다른 언어를 허용하지 않으며 예외는 없다.
1-2. 답변은 무조건 존대어를 사용하여 전달한다. 친절하고 상냥한 어투를 사용한다.
2. 전체 답변은 아래 조건에서 제공한 형식을 따라 JSON 포맷에 맞추어 보낸다.  
3. 답변의 형식은 아래와 같다. 각 항목에 대한 상세 조건은 후술한다.
{
	isRelevant: post와 연관성 있는 질문인지에 대한 여부(boolean),
	message: 질문에 대한 답변(string, 한국어)
}
4. isRelevant는 question의 내용이 post와 연관성 있는 질문인지를 판단하여 true 또는 false의 boolean 값을 반환한다.
4-1. question의 내용이 post와 연관성 있는 질문 또는 단어일 경우 true를 반환한다.
4-2. question의 내용이 post와 연관성 없는 질문 또는 단어일 경우 false를 반환한다.
5. message는 question에 대한 답변이다.
5-1. 만약 isRelevant가 false일 경우, 즉 question의 내용이 post와 연관성이 없을 경우 빈 문자열을 반환한다.
5-2. isRelevant가 true일 경우, question에 대한 답변을 한국어로 전달한다. 
5-3. isRelevant가 true이며 질문을 보냈을 경우에는 질문에 대한 답변을 전달한다.
5-4. isRelevant가 true이며 단어를 보냈을 경우에는 단어에 대한 정의와 설명을 답변으로 전달한다.
5-5. 사용자가 전달한 question에 대해 post의 내용과 맥락을 연결지어 답변한다. 
5-6. 답변의 내용을 길고 상세하게 전달한다.
5-7. 문장마다 줄바꿈처리한다. 
5-8. 답변 내부에 다운로드 링크를 제공해야 하는 경우 답변의 마지막 단락에 위치시킨다. 다운로드가 있는 마지막 단락은 항상 줄바꿈하여 출력한다.
5-9. 답변의 줄바꿈을 유지한 상태로 json string 형식에 맞추어 이스케이프 처리하여 출력한다. 줄바꿈이 있는 경우 \\n 문자를 삽입한다.
  `;

  const response = await fetch(`${checkEnvVar("LLAMA3_API_URL")}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_message: prompt, temperature, top_p }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LLaMA3 API 응답 오류: ${response.status} ${errorBody}`);
  }

  const responseText = await response.text();
  console.log(responseText);

  if (!responseText.trim() || responseText.trim() === "[]") return null;

  try {
    const sanitizedResponse = sanitizeJsonString(responseText);
    const parsedResponse = JSON.parse(sanitizedResponse);
    const AIResponse: ChatMessage = {
      sender: "AI",
      id: Date.now().toString(),
      message: "",
      created_at: Date.now().toString(),
    };

    if (parsedResponse.isRelevant) {
      return { ...AIResponse, message: parsedResponse.message };
    } else {
      return {
        ...AIResponse,
        message: "보안 취약점과 연관성 없는 질문에는 답변이 어려워요.",
      };
    }
  } catch (error) {
    throw new Error("AI chatbot error");
  }
};
