import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { ArticleType } from "@/types/scrap";

// 스크랩 추가 함수
export const addScrapPost = async (userEmail: string, postId: string) => {
  const userRef = doc(db, "users", userEmail);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        scrapPosts: arrayUnion(postId),
      });
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

// 스크랩한 게시글 가져오기 함수
export const getScrapPosts = async (userEmail: string) => {
  const userRef = doc(db, "users", userEmail);
  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const { scrapPosts } = userDoc.data() as { scrapPosts: string[] };

      if (scrapPosts.length > 0) {
        const crawlingRef = collection(db, "crawling");
        const q = query(crawlingRef, where("__name__", "in", scrapPosts));
        const querySnapshot = await getDocs(q);

        const posts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            label: data.label as ArticleType,
            name: data.title || "",
            c_id: data.c_id,
            created_at: data.upload_at,
          };
        });
        return posts;
      } else {
        return [];
      }
    } else {
      console.error("User not found");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 스크랩 삭제 함수
export const removeScrapPost = async (userId: string, postId: string) => {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      scrapPosts: arrayRemove(postId),
    });
  } catch (error) {
    console.error(error);
  }
};
