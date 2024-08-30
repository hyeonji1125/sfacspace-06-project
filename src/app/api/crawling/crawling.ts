const puppeteer = require("puppeteer");
const fs = require("fs");

// 테스트 방법 : 터미널로 src/app/api/crawling 까지 들어오고
// npx ts-node crawling.ts

// type CrawlingResult = {
//   pText: string;
//   spanText: string;
// };

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.cnnvd.org.cn/home/warn", {
//     waitUntil: "networkidle2",
//   });

//   // 특정 요소가 로드될 때까지 대기
//   //이게 컴포넌트 한덩이에요(title,소개).
//   await page.waitForSelector(".week_el.el-col.el-col-24");

//   // 데이터 추출
//   const data = await page.evaluate(() => {
//     const elements = document.querySelectorAll(".week_el.el-col.el-col-24");
//     let results: CrawlingResult[] = [];

//     elements.forEach((element) => {
//       const pText =
//         (element.querySelector("p.content-title") as HTMLElement)?.innerText ||
//         "";
//       const spanText =
//         (element.querySelector("div.content-detail span") as HTMLElement)
//           ?.innerText || "";
//       results.push({ pText, spanText });
//     });

//     return results;
//   });

//   console.log(data); // 추출한 타이틀, 데이터 출력

//   await browser.close();
// })();

type CrawlingResult = {
  contentTitle: string;
  contentDetail: string;
  detailTitle?: string;
  detailSubtitle?: string;
  detailContent?: string;
  tableData?: string;
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.cnnvd.org.cn/home/warn", {
    waitUntil: "networkidle2",
  });

  // 특정 요소가 로드될 때까지 대기
  await page.waitForSelector(".week_el.el-col.el-col-24");

  // 데이터 추출
  const data: CrawlingResult[] = await page.evaluate(() => {
    //해당 클래스네임
    const elements = document.querySelectorAll(".week_el.el-col.el-col-24");
    let results: CrawlingResult[] = [];

    elements.forEach((element) => {
      const contentTitle =
        (element.querySelector("p.content-title") as HTMLElement)?.innerText ||
        "";
      const contentDetail =
        (element.querySelector("div.content-detail span") as HTMLElement)
          ?.innerText || "";
      results.push({ contentTitle, contentDetail });
    });

    return results;
  });

  // 각 컴포넌트를 클릭하여 추가적인 데이터를 가져오기
  for (let i = 0; i < data.length; i++) {
    // 해당 컴포넌트 클릭
    await page.click(`.week_el.el-col.el-col-24:nth-child(${i + 1})`);

    // 클릭 후 렌더링될 요소 대기
    await page.waitForSelector(".detail-title");

    // detail-title, detail-subtitle, detailcontent의 p 태그들, MsoTableGrid 테이블 데이터를 추출
    const detailData = await page.evaluate(() => {
      const detailTitle =
        (document.querySelector(".detail-title") as HTMLElement)?.innerText ||
        "";
      const detailSubtitle =
        (document.querySelector(".detail-subtitle") as HTMLElement)
          ?.innerText || "";
      // detail-subtitle 아래 있는 모든 태그 내용 추출
      const contentElements = document.querySelectorAll(".detail-subtitle ~ *");
      let detailContent = "";
      contentElements.forEach((element) => {
        if (element.classList.contains("MsoTableGrid")) {
          // 테이블이 시작되면 content 수집 종료
          return;
        }
        detailContent += (element as HTMLElement).innerText + "\n";
      });

      let tableData = "";
      const table = document.querySelector(".MsoTableGrid");
      if (table) {
        const rows = table.querySelectorAll("tr");
        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          cells.forEach((cell) => {
            tableData += cell.innerText.trim() + " | ";
          });
          tableData += "\n";
        });
      }

      return {
        detailTitle,
        detailSubtitle,
        detailContent,
        tableData,
      };
    });

    // 추출한 데이터를 기존 결과에 추가
    data[i].detailTitle = detailData.detailTitle;
    data[i].detailSubtitle = detailData.detailSubtitle;
    data[i].detailContent = detailData.detailContent;
    data[i].tableData = detailData.tableData;

    // 추출한 데이터를 콘솔에 출력
    console.log(`Component ${i + 1} Data:`);
    console.log("Title:", detailData.detailTitle);
    console.log("Subtitle:", detailData.detailSubtitle);
    console.log("Content:", detailData.detailContent);
    console.log("Table Data:", detailData.tableData);

    // 필요 시, 뒤로가기 등의 작업 수행
    await page.goBack(); // 자동으로 뒤로가기
    await page.waitForSelector(".week_el.el-col.el-col-24"); // 컴포넌트들이 다시 로드될 때까지 대기
  }

  await browser.close();
})();
