import { db } from "@/lib/firebaseAdmin"; // Firestore 연결 (admin SDK 사용)
import { NextResponse } from "next/server";

// GET 요청 처리
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10); // 페이지 번호 (기본값 1)
  const pageSize = 5; // 페이지당 5개씩

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  try {
    // 검색할 필드 (단일 필드로 테스트)
    const field = "title"; // 여기서 검색할 필드 설정 (필요시 변경)

    let querySnapshot;

    // 첫 번째 페이지인 경우
    if (page === 1) {
      querySnapshot = await db
        .collection("crawling")
        .where(field, ">=", query)
        .where(field, "<=", query + "\uf8ff")
        .limit(pageSize) // 첫 페이지에 대한 제한
        .get();
    } else {
      // 이전 페이지의 마지막 문서를 기준으로 시작
      const previousSnapshot = await db
        .collection("crawling")
        .where(field, ">=", query)
        .where(field, "<=", query + "\uf8ff")
        .limit((page - 1) * pageSize) // 이전 페이지까지 데이터 가져오기
        .get();

      const lastVisible =
        previousSnapshot.docs[previousSnapshot.docs.length - 1]; // 이전 페이지 마지막 문서

      // 마지막 문서가 없는 경우
      if (!lastVisible) {
        return NextResponse.json({ results: [] });
      }

      // 다음 페이지에 대한 쿼리 실행
      querySnapshot = await db
        .collection("crawling")
        .where(field, ">=", query)
        .where(field, "<=", query + "\uf8ff")
        .startAfter(lastVisible) // 이전 페이지의 마지막 문서부터 시작
        .limit(pageSize) // 페이지당 문서 수 제한
        .get();
    }

    // 쿼리 결과에서 데이터 추출
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 총 문서 수 계산 (Firestore에서는 따로 카운트를 계산해야 함)
    const totalItemsSnapshot = await db
      .collection("crawling")
      .where(field, ">=", query)
      .where(field, "<=", query + "\uf8ff")
      .get();
    const totalItems = totalItemsSnapshot.docs.length;

    // JSON 응답 반환
    return NextResponse.json({ results, totalItems });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
