import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import crypto from "crypto";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { saveToFirestore } from "../firebase.js";

dotenv.config();

// cd lib/crawling 파일로 와서
//node cnnvd-crawling.js 실행

// Google Cloud Translation API 클라이언트 설정
// const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });
const translate = new Translate({
  keyFilename:
    "/Users/apple/Desktop/translateKey/sfacspaceeng-88efa4c23808.json", // 서비스 계정 키 파일 경로
});

// 텍스트 번역 함수
async function translateText(text, targetLanguage = "ko") {
  try {
    const [translated] = await translate.translate(text, targetLanguage);
    return translated;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // 번역 실패 시 원문 반환
  }
}

// 대괄호 안에 있는 텍스트 추출 함수
function extractLabelFromTitle(title) {
  const match = title.match(/\[(.*?)\]/);
  return match ? match[1] : "";
}

// 해시 생성 함수
function generateUniqueId(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.cnnvd.org.cn/home/warn", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".content-center");

  const siteName = "CNNVD"; // 사이트 이름

  const postDetails = []; // 상세 정보를 저장할 배열

  for (let i = 1; i < 11; i++) {
    try {
      // 다시 게시글 목록으로 이동 후 게시글 클릭
      await page.goto("https://www.cnnvd.org.cn/home/warn", {
        waitUntil: "networkidle2",
      });
      await page.waitForSelector(".content-center");

      // i번째 게시글 클릭
      await page.click(`.content-center:nth-child(${i})`);
      await page.waitForSelector(".detail-info");

      const postDetail = await page.evaluate(() => {
        const postDetailElement = document.querySelector(".detail-info");
        if (!postDetailElement) return null;

        const tables = Array.from(
          postDetailElement.querySelectorAll(".detail-content table"),
        ).map(
          (table) => table.innerText, // 테이블의 텍스트 저장
        );

        const tableContent = tables.length === 0 ? "" : tables;

        postDetailElement
          .querySelectorAll(".detail-content table")
          .forEach((table) => table.remove());

        const title =
          postDetailElement.querySelector(".detail-title")?.innerText || "";
        const date =
          postDetailElement.querySelector(".detail-subtitle span")?.innerText ||
          "";
        const content =
          postDetailElement.querySelector(".detail-content")?.innerText || "";

        return { title, date, content, tables: tableContent };
      });

      if (postDetail) {
        const uniqueId = generateUniqueId(postDetail.title + postDetail.date);

        postDetails.push({
          id: uniqueId,
          title: postDetail.title,
          date: postDetail.date,
          content: postDetail.content,
          tables: postDetail.tables,
        });
      }
    } catch (error) {
      console.error(`Error processing post ${i + 1}:`, error);
    }
  }

  const translatedPostDetails = await Promise.all(
    postDetails.map(async (postDetail) => {
      const transTitle = await translateText(postDetail.title);

      const transDate = await translateText(postDetail.date);
      const cleanDate = transDate.replace("출시 시간: ", "").trim();

      const transContent = await translateText(postDetail.content);
      const transTableContents = await translateText(postDetail.tables);
      const label = extractLabelFromTitle(transTitle);

      return {
        c_id: postDetail.id,
        title: transTitle,
        label,
        create_at: cleanDate,
        report_content: transContent,
        table_content: transTableContents,
        site_name: siteName,
      };
    }),
  );

  for (const post of translatedPostDetails) {
    await saveToFirestore(post);
  }

  // 번역된 게시글 출력
  // console.log(JSON.stringify(translatedPostDetails, null, 2));
  // console.log(translatedPostDetails);

  await browser.close();
})();
