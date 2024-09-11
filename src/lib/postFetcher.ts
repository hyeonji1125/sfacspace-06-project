import { getData } from "@/hooks/fetchData";
import { PostDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const crawlingPostData = async (): Promise<PostDataType[]> => {
  try {
    const postData = await getData("crawling");

    return postData as PostDataType[];
  } catch (error) {
    console.error("Failed to fetch crawling post data:", error);
    throw error;
  }
};

export const updatePostViews = async (id: string, newViews: number) => {
  const postRef = doc(db, "crawling", id);
  try {
    await updateDoc(postRef, {
      views: newViews,
    });
  } catch (error) {
    console.error("Error updating views:", error);
  }
};

export const updatePostChips = async (id: string, newChips: string) => {
  const postRef = doc(db, "crawling", id);
  try {
    await updateDoc(postRef, {
      chips: newChips, // chips 필드 업데이트
    });
  } catch (error) {
    console.error("Error updating chips:", error);
  }
};
