import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import crypto from "crypto";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
// import { saveToFirestore } from "./firebase.js";

dotenv.config();

// cd lib/crawling 파일로 와서 /node cnnvd-crawling.js 실행

// Google Cloud Translation API 클라이언트 설정
// const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });
const translate = new Translate({
  keyFilename:
    "/Users/apple/Desktop/translateKey/translate-crawling-5e7001791004.json", // 서비스 계정 키 파일 경로
});

function splitTextIntoChunks(text, maxChunkSize = 5000) {
  const chunks = [];
  let currentChunk = "";

  for (const line of text.split("\n")) {
    if ((currentChunk + line).length > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = "";
    }
    currentChunk += line + "\n";
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

async function translateText(text, targetLanguage = "ko") {
  try {
    const chunks = splitTextIntoChunks(text);

    const translatedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const [translatedChunk] = await translate.translate(
          chunk,
          targetLanguage,
        );
        return translatedChunk;
      }),
    );

    // 3. 번역된 청크를 다시 합침
    return translatedChunks.join("");
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

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

  const siteName = "CNNVD";

  const postDetails = [];

  for (let i = 1; i < 2; i++) {
    // i=1 i<11
    try {
      await page.goto("https://www.cnnvd.org.cn/home/warn", {
        waitUntil: "networkidle2",
      });
      await page.waitForSelector(".content-center");

      await page.click(`.content-center:nth-child(${i})`);
      await page.waitForSelector(".detail-info");

      const postDetail = await page.evaluate(() => {
        const postDetailElement = document.querySelector(".detail-info");
        if (!postDetailElement) return null;

        const tables = Array.from(
          postDetailElement.querySelectorAll(".detail-content table"),
        ).map((table) => table.outerHTML);

        const tableContent = tables.length === 0 ? "" : tables.join("\n");

        postDetailElement
          .querySelectorAll(".detail-content table")
          .forEach((table) => table.remove());

        const title =
          postDetailElement.querySelector(".detail-title")?.innerText || "";
        const create_at =
          postDetailElement.querySelector(".detail-subtitle span")?.innerText ||
          "";
        const content =
          postDetailElement.querySelector(".detail-content")?.innerText || "";

        const upload_at = new Date().toISOString();

        return { title, create_at, content, tables: tableContent, upload_at };
      });

      if (postDetail) {
        const uniqueId = generateUniqueId(postDetail.title + postDetail.date);

        postDetails.push({
          id: uniqueId,
          title: postDetail.title,
          create_at: postDetail.create_at,
          content: postDetail.content,
          tables: postDetail.tables,
          upload_at: postDetail.upload_at,
        });
      }
    } catch (error) {
      console.error(`Error processing post ${i + 1}:`, error);
    }
  }

  const translatedPostDetails = await Promise.all(
    postDetails.map(async (postDetail) => {
      const transTitle = await translateText(postDetail.title);

      const transDate = await translateText(postDetail.create_at);
      const cleanDate = transDate.replace("출시 시간: ", "").trim();

      const transContent = await translateText(postDetail.content);
      const transTableContents = await translateText(postDetail.tables);
      const label = extractLabelFromTitle(transTitle);
      const views = 2;

      return {
        c_id: postDetail.id,
        title: transTitle,
        label,
        create_at: cleanDate,
        report_content: transContent,
        table_content: transTableContents,
        site_name: siteName,
        upload_at: postDetail.upload_at,
        views,
      };
    }),
  );

  // for (const post of translatedPostDetails) {
  //   await saveToFirestore(post);
  // }

  // 번역된 게시글 출력
  // console.log(JSON.stringify(translatedPostDetails, null, 2));
  console.log(translatedPostDetails);

  await browser.close();
})();
