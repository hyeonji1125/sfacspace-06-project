import { db } from "@/lib/firebase";
import { RepositoryContent } from "@/types";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
//북마크 추가 함수
export const addBookmark = async (
  userId: string,
  repoName: string,
  filePath: string,
) => {
  try {
    // bookmarkRef 생성: userId와 repoName이 올바르게 전달되는지 확인
    if (!userId || !repoName) {
      throw new Error("Invalid userId or repoName");
    }
    const bookmarkRef = doc(db, "users", userId, "bookmarks", repoName);
    // 문서 업데이트 시 배열에 값 추가
    await updateDoc(bookmarkRef, {
      filePaths: arrayUnion(filePath),
      bookmarkedAt: new Date(),
    });
    alert("북마크 저장 완료");
  } catch (error: any) {
    console.error("북마크 저장 중 에러:", error);

    // 문서가 없을 경우 새 문서 생성
    if (error.message.includes("No document to update")) {
      try {
        const bookmarkRef = doc(db, "users", userId, "bookmarks", repoName);
        await setDoc(bookmarkRef, {
          filePaths: [filePath],
          bookmarkedAt: new Date(),
        });
        console.log("북마크 새 문서로 저장 완료");
        alert("북마크 새 문서로 저장 완료");
      } catch (setError) {
        console.error("북마크 새 문서 저장 중 에러:", setError);
      }
    }
  }
};

// 북마크 삭제 함수
export const removeBookmark = async (
  userId: string,
  repoName: string,
  filePath: string,
) => {
  try {
    if (!userId || !repoName) {
      throw new Error("Invalid userId or repoName");
    }

    const bookmarkRef = doc(db, "users", userId, "bookmarks", repoName);

    await updateDoc(bookmarkRef, {
      filePaths: arrayRemove(filePath),
    });
    console.log("북마크 삭제 완료");
    alert("북마크 삭제 완료");
  } catch (error) {
    console.error("북마크 삭제 중 에러:", error);
  }
};

// 북마크 클릭 핸들러 함수
export const handleBookmarkClick = async (
  email: string | null,
  repoName: string | null,
  path: string,
  isBookmark: boolean,
  setIsBookmark: (state: boolean) => void,
) => {
  if (!email || !repoName) return;
  setIsBookmark(!isBookmark); // 북마크 상태 토글

  try {
    if (isBookmark) {
      await removeBookmark(email, repoName, path); // 북마크 삭제
    } else {
      await addBookmark(email, repoName, path); // 북마크 추가
    }
  } catch (error) {
    console.error("북마크 추가/삭제 중 에러:", error);
  }
};

// 북마크 정보 받아오기 함수
export const fetchBookmarks = async (
  email: string | null,
  repoName: string | null,
  path: string,
): Promise<boolean> => {
  if (!email || !repoName) return false;

  try {
    const bookmarkRef = doc(db, "users", email, "bookmarks", repoName);
    const bookmarkSnap = await getDoc(bookmarkRef);

    if (bookmarkSnap.exists()) {
      const data = bookmarkSnap.data();
      return data.filePaths && data.filePaths.includes(path);
    } else {
      return false;
    }
  } catch (error) {
    console.error("북마크 가져오는 중 에러:", error);
    return false;
  }
};

// 모든 북마크 정보 불러오는 함수
export const fetchAllBookmarks = async (
  email: string | null,
  repoName: string | null,
  repoContents: RepositoryContent[],
  setBookmarkedStatus: (status: { [path: string]: boolean }) => void,
) => {
  if (!email || !repoName) return;

  const statusMap: { [path: string]: boolean } = {};
  for (const file of repoContents) {
    const isBookmarked = await fetchBookmarks(email, repoName, file.path);
    statusMap[file.path] = isBookmarked;
  }

  setBookmarkedStatus(statusMap);
};
