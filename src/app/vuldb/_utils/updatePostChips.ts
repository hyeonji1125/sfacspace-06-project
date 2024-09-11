import { db } from "@/lib/firebase";
import { updatePostChips } from "@/lib/postFetcher";
import { PostDataType } from "@/types";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

export const updatePostChipsInDB = async (): Promise<PostDataType[]> => {
  const postsQuery = query(
    collection(db, "crawling"),
    orderBy("views", "desc"), // 조회수로 정렬
  );

  const postsSnapshot = await getDocs(postsQuery); // 전체 데이터 가져오기
  const posts = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PostDataType[];

  const currentTime = Timestamp.now().toMillis(); // 현재 시간

  await Promise.all(
    posts.map(async (post, index) => {
      const postTime = new Date(post.upload_at!).getTime();
      const isNew = postTime >= currentTime - 48 * 60 * 60 * 1000; // 48시간 이내 여부 확인
      let newChip = "default"; // 기본값

      if (index < 10) {
        newChip = "hot"; // 상위 10개 조회수는 hot
      } else if (isNew && newChip !== "hot") {
        newChip = "new"; // 48시간 이내면 new, 하지만 hot이 우선!
      }

      // DB에 칩 업데이트
      if (post.chips !== newChip) {
        await updatePostChips(post.id, newChip);
      }
    }),
  );

  return posts; // 전체 게시글 반환
};
