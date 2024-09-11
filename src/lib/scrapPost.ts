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

        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return posts;
      } else {
        console.log("No scrap posts");
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
