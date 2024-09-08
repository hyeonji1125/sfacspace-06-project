import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// 데이터 가져오기 (GET)
export const getData = async (url: string, id?: string) => {
  try {
    if (id) {
      const docRef = doc(db, url, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Document not found");
      }
    } else {
      const querySnapshot = await getDocs(collection(db, url));
      const allDocs: any[] = [];
      querySnapshot.forEach((doc) => {
        allDocs.push({ id: doc.id, ...doc.data() });
      });
      return allDocs;
    }
  } catch (error) {
    throw new Error("Failed to get document: ");
  }
};

// 데이터 추가 (POST)
export const postData = async (url: string, data: any) => {
  try {
    const { email } = data;
    if (!email) {
      throw new Error("Email is required as the document ID");
    }
    // Firestore의 url(컬렉션)에 email을 ID로 하는 문서 생성
    const docRef = doc(collection(db, url), email);
    await setDoc(docRef, data);

    return { success: true, id: email };
  } catch (error) {
    return { success: false, message: "Failed to create document: " };
  }
};

// 데이터 업데이트 (PUT)
export const putData = async (url: string, id: string | number, data: any) => {
  try {
    // 문서 참조
    const docRef = doc(db, url, id.toString());
    // 문서 업데이트
    await updateDoc(docRef, data);
    return "Document updated";
  } catch (error) {
    throw new Error("Failed to update document: put 에러임");
  }
};

// 데이터 삭제 (DELETE)
export const deleteData = async (url: string, id: string) => {
  try {
    const docRef = doc(db, url, id);
    await deleteDoc(docRef);
    return "Document deleted";
  } catch (error) {
    throw new Error("Failed to delete document: delete 에러임");
  }
};

export const deleteCollection = async (url: string) => {
  try {
    const docsRef = collection(db, url);
    const docsSnapshot = await getDocs(docsRef);
    docsSnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, url, docSnap.id));
    });
    return "Entire collection files deleted successfully.";
  } catch (error) {
    throw new Error(`Failed to delete collection: ${url}`);
  }
};

//검색어 보내기
export const postSearch = async (url: string, data: string) => {
  try {
    // Firestore의 url(컬렉션)에 email을 ID로 하는 문서 생성
    const docRef = doc(collection(db, url), data);
    await setDoc(docRef, { text: data, timestamp: new Date() }); // 검색어와 시간을 함께 저장

    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to create document: " };
  }
};
