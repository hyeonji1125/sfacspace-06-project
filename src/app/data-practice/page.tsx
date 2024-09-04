'use client';

import { deleteData, getData, postData, putData } from "@/hooks/fetchData";
import { useEffect, useState } from "react";

export default function Page() {
    // get 메소드용 변수
    const [data, setData] = useState<any[]>([]);
    const [oneData,setOneData] = useState<any>([])


//Get 예시 (1.컬렉션의 모든 데이터 , 2.컬렉션의 한부분)
    useEffect(() => {
    //컬렉션의 모든 데이터
      const fetchData = async () => {
          try {
              const result = await getData('users');
              if (Array.isArray(result)) {
                  setData(result);
              }
          } catch (error) {
              console.error("에러: 모든 데이터");
          }
      };
    //데이터 콜렉션의 1개 받기
      const fetchDataOne = async () => {
          try {
              const result = await getData('users', 'foottable@gmail.com');
              if (result) { // result가 객체인지 확인
                  setOneData(result);
              }
          } catch (error) {
              console.error("에러: 데이터 하나");
          }
      };

      fetchData();
      fetchDataOne(); // 재귀 호출 제거
  }, []);

// Post 예시
  const addUser = async () => {
    const userData = {
      email: "post2@gmail.com",
      name: "minho",
      createdAt: "2024-08-25T10:09:13.610Z",
      image: "https://avatars.githubusercontent.com/u/112041983?v=4"
    };
  
    const result = await postData('users', userData);
  
    if (result.success) {
      alert(`Document created with ID:  ${result.id}`);
    } else {
      console.error(result.message);
    }
  };
  
//Put 예시
const updateUser = async () => {
  const userData = {
      email: "put실험하기@gmail.com",
      name: "change",
      image: "https://avatars.githubusercontent.com/u/112041983?v=4",
  };
  //주소 env라 예시로 보여드립니다!
  const userId = "vqYNSR9wCYefvUIeV5Ui"; // 변경해야할 ID

  try {
      const result = await putData('users', userId, userData);
      console.log(result);
  } catch (error) {
      console.error(error);
  }
};

//Delete 예시
const deleteUser = async () => {
  const userId = "vqYNSR9wCYefvUIeV5Ui"; // 삭제해야할 ID

  try {
      const result = await deleteData('users', userId);
      alert(`${result}를 삭제했습니다`)
  } catch (error) {
      console.error(error , "delete 에러임");
  }
};


    return (
      <div>
      <h1></h1>
      <div className="flex flex-col gap-5 mb-5 border border-b-black">
      <button className="border border-black" onClick={addUser}>Post 보내기</button>
      <button className="border border-black" onClick={updateUser}>Put 보내기</button>
      <button className="border border-black" onClick={deleteUser}>delete 보내기</button>
      </div>
      {/* get메소드 사용예시 */}
      <div>전체 데이터 가져오기</div>
      {data.length > 0 ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
          <p>데이터가 없습니다.</p>
      )}
      <div>데이터 하나 가져오기</div>
      {oneData ? ( // 단일 객체가 존재하는지 확인
          <pre>{JSON.stringify(oneData, null, 2)}</pre>
      ) : (
          <p>단일 데이터가 없습니다.</p>
      )}

  </div>
    );
}
