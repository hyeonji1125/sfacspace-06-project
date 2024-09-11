import { db } from "@/lib/firebase";
import { updatePostViews } from "@/lib/postFetcher";
import { PostDataType } from "@/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const incrementPostView = async (post: PostDataType) => {
  const newViews = (post.views || 0) + 1;
  await updatePostViews(post.id, newViews); // 조회수 업데이트
};

export const fetchHotPosts = async (): Promise<PostDataType[]> => {
  const hotPostsQuery = query(
    collection(db, "crawling"),
    orderBy("views", "desc"),
  );

  const hotPostsSnapshot = await getDocs(hotPostsQuery);
  const hotPosts = hotPostsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PostDataType[];

  return hotPosts; // 조회수 순으로 정렬된 게시글 반환
};

export const fetchNewPosts = async (): Promise<PostDataType[]> => {
  const newPostsQuery = query(
    collection(db, "crawling"),
    orderBy("upload_at", "desc"),
  );

  const newPostsSnapshot = await getDocs(newPostsQuery);
  const newPosts = newPostsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PostDataType[];

  return newPosts; // 최신순으로 정렬된 게시글 반환
};
