import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const getReposData = async (email: string) => {
  try {
    const reposCollectionRef = collection(db, `users/${email}/repos`);
    const querySnapshot = await getDocs(reposCollectionRef);
    const repos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return repos;
  } catch (error) {
    throw new Error(`${error}, "DB에서 Repos Data를 받아오는데 실패했습니다."`);
  }
};

export const postRepo = async (email: string, repoName: string, data: any) => {
  try {
    const repoDocRef = doc(collection(db, `users/${email}/repos`), repoName);
    await setDoc(repoDocRef, data, { merge: true });
  } catch (error) {
    throw new Error("DB에서 Repo Data를 업데이트 하는데 실패했습니다.");
  }
};
