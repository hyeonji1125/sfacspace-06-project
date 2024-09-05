import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import dotenv from "dotenv";
import { collection, doc, setDoc } from "firebase/firestore";
import puppeteer from "puppeteer";
import { db } from "../firebase.js"; // 확장자를 명시하여 불러오기
dotenv.config();

// Google Cloud Translation API 클라이언트 설정
// const translate = new Translate({
//   key: process.env.GOOGLE_TRANSLATE_ENG_API_KEY,
// });

const translate = new Translate({
  keyFilename:
    "/Users/shinminho/Desktop/translateKey/sfacspaceeng-88efa4c23808.json", // 서비스 계정 키 파일 경로
});

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // CVE 목록 페이지로 이동
  await page.goto(
    "https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&search_type=last3months&isCpeNameSearch=false",
    {
      waitUntil: "networkidle2",
    },
  );

  // 'vuln-row'로 시작하는 모든 요소가 로드될 때까지 대기
  await page.waitForSelector("table.table-striped.table-hover");

  // CVE 리스트의 각 CVE 링크 및 설명 추출 (동기적으로 데이터를 가져옴)
  const cveList = await page.evaluate(() => {
    const postElements = document.querySelectorAll(
      "table.table-striped.table-hover tbody tr",
    );
    const cveList = [];

    postElements.forEach((post) => {
      const linkElement = post.querySelector("th a");
      const c_id = linkElement.innerText;
      const create_at = post.querySelector(
        'span[data-testid^="vuln-published-on-"]',
      )?.innerText;
      const url = linkElement.href;
      // const create_at = formatDate(origin_create_at);
      const originDescription =
        post.querySelector("td p")?.innerText || "No description available"; // 설명 추출

      // CVE 데이터 저장
      cveList.push({ c_id, url, create_at, originDescription });
    });

    return cveList;
  });

  // console.log(cveList);

  // Node.js 컨텍스트에서 번역 작업 처리
  for (let i = 0; i < cveList.length; i++) {
    const transDescription = await translateText(cveList[i].originDescription); // 설명 번역
    cveList[i].transDescription = transDescription; // 번역된 설명으로 덮어쓰기
    delete cveList[i].originDescription; // 원본 설명 삭제 (필요 없으면)
  }

  // console.log(cveList); // 번역된 설명이 포함된 CVE 리스트 출력

  // 각 CVE 항목의 상세 페이지를 크롤링
  const cveDetails = [];

  for (let i = 0; i < cveList.length; i++) {
    const { c_id, url, create_at, transDescription } = cveList[i];
    console.log(`Processing: ${c_id} - ${url}`);

    // CVE 상세 페이지로 이동
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    // 테이블의 텍스트 데이터만 추출
    const tableData = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("#vulnDetailTableView table tr"),
      );
      if (rows.length === 0) {
        return "No table data available"; // 데이터가 없으면 기본값 설정
      }

      return rows
        .map((row) => {
          const cells = Array.from(row.querySelectorAll("td, th")).map((cell) =>
            cell.innerText.trim(),
          );
          return cells.join(" | "); // 각 셀 데이터를 '|'로 구분하여 연결
        })
        .join("\n"); // 각 행 데이터를 줄바꿈으로 구분
    });

    // 테이블 데이터와 번역된 설명 출력
    console.log(
      `\nCVE ID: ${c_id}\nDescription: ${transDescription}\nDetails:\n${tableData}\n`,
    );

    // 번역 작업 (필요한 경우 번역)
    const report_content = await translateText(tableData);

    // 결과 저장
    cveDetails.push({
      c_id,
      title: `${c_id} 디테일`,
      create_at,
      description: transDescription, // 번역된 설명
      report_content,
      site_name: "nist",
      label: "기타",
    });
  }

  // 크롤링된 상세 정보 출력
  console.log("CVE Details:", cveDetails);

  // 브라우저 종료
  await browser.close();

  // cveDetails 배열을 Firestore에 저장하는 호출 부분
  await saveCveDetailsToFirestore("crawling", cveDetails);
})();

// 한글 번역 함수
async function translateText(text, targetLanguage = "ko") {
  // 텍스트가 비어 있거나 null인 경우 번역하지 않도록 처리
  if (!text || text.trim() === "") {
    console.warn("No text provided for translation.");
    return text; // 텍스트가 없으면 원래 값을 반환
  }

  try {
    const [translated] = await translate.translate(text, targetLanguage);
    return translated;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // 번역 실패 시 원문 반환
  }
}

export const postNist = async (url, data) => {
  try {
    const { c_id } = data;
    // 데이터 검증을 위한 로그 출력
    console.log("Saving document:", data);

    // Firestore 문서 ID가 유효한지 확인 (c_id에 특수 문자가 있는지 체크)
    if (!c_id || /[\/#\[\].*%]/.test(c_id)) {
      throw new Error(`Invalid Firestore document ID: ${c_id}`);
    }

    const docRef = doc(collection(db, url), c_id);
    await setDoc(docRef, data);
    return { success: true, id: c_id };
  } catch (error) {
    console.error(`Firestore 저장 오류: ${error.message}`);
    return {
      success: false,
      message: `Failed to create document: ${error.message}`,
    };
  }
};

// Firestore에 배열의 각 항목을 하나씩 저장하는 함수
const saveCveDetailsToFirestore = async (collectionName, dataArray) => {
  try {
    // 모든 배열 항목에 대해 postNist 호출을 병렬로 처리
    const promises = dataArray.map((data) => postNist(collectionName, data));
    await Promise.all(promises); // 모든 비동기 작업 완료 대기
    console.log("모든 데이터가 성공적으로 Firestore에 저장되었습니다.");
  } catch (error) {
    console.error("데이터 저장 중 오류 발생:", error);
  }
};
