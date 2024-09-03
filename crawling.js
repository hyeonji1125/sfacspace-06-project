import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

// Google Cloud Translation API 클라이언트 설정
const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

// node crawling.js 실행
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.cnnvd.org.cn/home/warn", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".content-center");

  // 게시글 제목과 시간을 가져오는 코드
  const posts = await page.evaluate(() => {
    const postElements = document.querySelectorAll(".content-center");
    const postList = [];

    postElements.forEach((post, index) => {
      const id = index + 1;
      const title = post.querySelector(".content-title").innerText;
      const date = post.querySelector(".content-detail span").innerText;
      postList.push({ id, title, date });
    });

    return postList;
  });

  // console.log(posts); // 게시글 목록 출력

  async function translateText(text, targetLanguage = "ko") {
    try {
      const [translated] = await translate.translate(text, targetLanguage);
      return translated;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // 번역 실패 시 원문 반환
    }
  }

  const translatedPosts = await Promise.all(
    posts.map(async (post) => {
      const transTitle = await translateText(post.title);
      const transDate = await translateText(post.date);
      return { id: post.id, transTitle, transDate };
    }),
  );
  // console.log(translatedPosts);

  const pageName = await page.evaluate(() => {
    () => document.title;
  });
  console.log(pageName); // 홈페이지명 가져오기

  const postDetails = []; // 상세 정보를 저장할 배열

  for (let i = 0; i < posts.length; i++) {
    try {
      await page.goto("https://www.cnnvd.org.cn/home/warn", {
        waitUntil: "networkidle2",
      });
      await page.waitForSelector(".content-center");

      // i번째 게시글 클릭
      await page.click(`.content-center:nth-child(${i + 1})`);
      await page.waitForSelector(".detail-info");

      const postDetail = await page.evaluate(() => {
        const postDetailElement = document.querySelector(".detail-info");
        if (!postDetailElement) return null;

        const title =
          postDetailElement.querySelector(".detail-title").innerText;
        const date = postDetailElement.querySelector(
          ".detail-subtitle span",
        ).innerText;
        const content =
          postDetailElement.querySelector(".detail-content").innerText;

        return { title, date, content };
      });

      if (postDetail) {
        postDetails.push({
          id: posts[i].id, // 기존 posts 배열의 id 사용
          title: postDetail.title,
          date: postDetail.date,
          content: postDetail.content,
        });
      }

      const translatedPostDetail = await Promise.all(
        postDetails.map(async (postDetail) => {
          const transTitle = await translateText(postDetail.title);
          const transDate = await translateText(postDetail.date);
          const transContent = await translateText(postDetail.content);
          return { id: postDetail.id, transTitle, transDate, transContent };
        }),
      );
      // console.log(translatedPostDetail);
    } catch (error) {
      console.error(`Error processing post ${i + 1}:`, error);
    }
  }

  await browser.close();
})();

//// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto("https://www.cnnvd.org.cn/home/warn", {
//     waitUntil: "networkidle2",
//   });

//   await page.waitForSelector(".content-center");

//   // 게시글 제목과 시간을 가져오는 코드
//   const posts = await page.evaluate(() => {
//     const postElements = document.querySelectorAll(".content-center");
//     const postList = [];

//     postElements.forEach((post, index) => {
//       const id = index + 1;
//       const title = post.querySelector(".content-title").innerText;
//       const date = post.querySelector(".content-detail span").innerText;
//       postList.push({ id, title, date });
//     });

//     return postList;
//   });

//   console.log(posts); // 게시글 목록 출력

//   const postDetails = []; // 상세 정보를 저장할 배열

//   for (let i = 0; i < posts.length; i++) {
//     try {
//       await page.goto("https://www.cnnvd.org.cn/home/warn", {
//         waitUntil: "networkidle2",
//       });
//       await page.waitForSelector(".content-center");

//       // i번째 게시글 클릭
//       await page.click(`.content-center:nth-child(${i + 1})`);
//       await page.waitForSelector(".detail-info");

//       const postDetail = await page.evaluate(() => {
//         const postDetailElement = document.querySelector(".detail-info");
//         if (!postDetailElement) return null;

//         const title =
//           postDetailElement.querySelector(".detail-title").innerText;
//         const date = postDetailElement.querySelector(
//           ".detail-subtitle span",
//         ).innerText;
//         const content =
//           postDetailElement.querySelector(".detail-content").innerHTML;

//         return { title, date, content };
//       });

//      if (postDetail) {
//         // HTML 파싱
//         const dom = new JSDOM(postDetail.content);
//         const document = dom.window.document;

//         // 텍스트 노드 추출 및 번역
//         const textNodes = Array.from(document.querySelectorAll("*"))
//           .map((node) => node.childNodes)
//           .flat()
//           .filter((node) => node.nodeType === dom.window.Node.TEXT_NODE);

//         for (const node of textNodes) {
//           const originalText = node.textContent?.trim();
//           if (originalText) {
//             const [translatedText] = await translate.translate(
//               originalText,
//               "ko", //한국어로 번역
//             );
//             node.textContent = translatedText;
//           }
//         }

//         // 번역된 HTML 가져오기
//         const translatedHTML = document.body.innerHTML;

//         postDetails.push({
//           id: posts[i].id,
//           title: postDetail.title,
//           date: postDetail.date,
//           content: translatedHTML,
//         });

//         console.log(`Translated post ${i + 1}:`, translatedHTML); // 번역된 HTML 출력
//       }
//     } catch (error) {
//       console.error(`Error processing post ${i + 1}:`, error);
//     }
//   }

//   console.log(postDetails); // 배열에 저장된 객체들 출력

//   await browser.close();
// })();
//여기까지
