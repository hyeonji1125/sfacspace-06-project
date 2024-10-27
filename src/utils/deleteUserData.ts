import { db } from "@/lib/firebaseAdmin";

// document 삭제 재귀 함수
const deleteDocumentRecursively = async (
  docRef: FirebaseFirestore.DocumentReference,
  batchSize: number,
): Promise<void> => {
  try {
    const collections = await docRef.listCollections(); // 지정한 document의 하위 collection 리스트를 불러옵니다
    for (const collection of collections) {
      await deleteCollectionRecursively(collection, batchSize); // 하위 컬렉션마다 collection 삭제 재귀 함수 호출
    }
    await docRef.delete(); // 하위 document와 collection이 모두 삭제된 후 해당 문서(최상위)를 삭제
  } catch (error) {
    throw error;
  }
};

const deleteCollectionRecursively = async (
  collectionRef: FirebaseFirestore.CollectionReference,
  batchSize: number,
): Promise<void> => {
  try {
    while (true) {
      const query = collectionRef.limit(batchSize); // 한 번에 batchSize 만큼만 처리
      const snapshot = await query.get();

      if (snapshot.empty) {
        break;
      }

      const batch = db.batch();

      for (const doc of snapshot.docs) {
        await deleteDocumentRecursively(doc.ref, batchSize); // 내부의 doc마다 doc 삭제 함수 호출
        batch.delete(doc.ref);
      }

      await batch.commit(); // 일괄 처리 실행
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUserData = async (email: string): Promise<void> => {
  const docRef = db.collection("users").doc(email);
  try {
    await deleteDocumentRecursively(docRef, 100);
  } catch (error) {
    throw error;
  }
};
