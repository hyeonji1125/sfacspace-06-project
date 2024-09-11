"use client";
import { useEffect, useState } from "react";
import Infobox from "./Infobox";
import { PiSpinnerGapBold } from "react-icons/pi";
import { useInView } from "react-intersection-observer";

export default function InspectionResult() {
  // 임시 data, code
  const arr = [
    {
      id: 1,
      title: `XSS (Cross-Site Scripting) Vulnerability`,
      error:
        "사용자 입력을 HTML에 직접 삽입하면서 HTML을 안전하게 처리하지 않음.",
      description:
        "사용자 입력을 HTML에 삽입하기 전에 반드시 적절한 인코딩을 수행하거나, DOM API를 사용해 안전하게 요소를 삽입해야함. ‘innerHTML’은 입력된 HTML 코드를 그대로 렌더링하기 때문에 악성 스크립트를 실행할 수 있음. ‘textContent’는 HTML을 해석하지 않고 텍스트로만 처리하기 때문에 안전함.",
      language: "javascript",
      modifiedCode: `function displayUserInput(input) {
    document.getElementById('userInput').textContent = input; // textContent를 사용해 XSS 예방
    }`,
    },
    {
      id: 2,
      title: `Insecure Password Handling`,
      error: "비밀번호를 ‘localStorage’ 에 평문으로 저장함.",
      description:
        "비밀번호는 브라우저의 메모리에서만 유지되도록 하고, 저장이 필요한 경우에는 안전한 해시 알고리즘을 사용해 해시값만 저장. ‘localStorage’는 자바스크립트를 통해 쉽게 접근할 수 있어, 악성 스크립트에 의해 유출될 수 있음. 비밀번호를 해시하여 저장하면 공격자가 해시값을 얻더라도 원래 비밀번호를 알아내기 어려움.",
      language: "javascript",
      modifiedCode: `function storePassword(password) {
    const hashedPassword = hashFunction(password); // 안전한 해시 함수 사용
    localStorage.setItem('passwordHash', hashedPassword);
}`,
    },
    {
      id: 3,
      title: `Insecure Authentication`,
      error: "고정된 세션 토큰을 사용하고, 비밀번호가 평문으로 확인됨.",
      description:
        "세션토큰은 안전하게 생성된 난수 값을 사용하고, 비밀번호는 해시화된 값과 비교. 고정된 세션 토큰은 예측 가능하며 탈취될 수 있음. 안전한 난수를 생성해 세션 토큰으로 사용하고, 이를 ‘Secure’와 ‘HttpOnly’로 설정해 쿠키의 보안을 강화함.",
      language: "javascript",
      modifiedCode: `function login(username, password) {
    const storedHashedPassword = getStoredHashedPassword(username);
    if (username === 'admin' && validatePassword(password, storedHashedPassword)) {
        document.cookie = "sessionToken=" + generateSecureToken() + "; path=/; Secure; HttpOnly"; // Secure and HttpOnly attributes added
        alert('Logged in as admin');
    } else {
        alert('Invalid credentials');
    }
}`,
    },
    {
      id: 4,
      title: `CSRF (Cross-Site Request Forgery) Vulnerability`,
      error: "CSRF 보호 매커니즘 없이 민감한 작업을 수행할 수 있음",
      description:
        "CSRF 토큰을 생성해 폼 데이터에 포함하고 서버에서 이를 검증. CSRF 공격은 사용자의 브라우저를 통해 자동으로 요청을 보내게 하여 피해를 입힐 수 있음. CSRF 토큰을 사용해 이 요청이 유효한 사용자가 보낸 것임을 검증함.",
      language: "javascript",
      modifiedCode: `function submitForm() {
    var csrfToken = getCsrfToken(); // 서버에서 생성된 CSRF 토큰 가져오기
    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'https://example.com/api/update');

    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'authToken');
    hiddenField.setAttribute('value', csrfToken); // CSRF 토큰 추가
    
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
}`,
    },
  ];
  const [isCompleted, setIsCompeleted] = useState(true);
  const { ref, inView } = useInView();
  const [loadedItems, setLoadedItems] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView && loadedItems < arr.length && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setLoadedItems((prev) => Math.min(prev + 3, arr.length));
        setIsLoading(false);
      }, 500);
    }
  }, [inView]);

  return (
    <div className="mt-11">
      {isCompleted ? (
        <>
          <ul className="flex flex-col gap-7">
            {arr.slice(0, loadedItems).map((el) => (
              <li key={el.id}>
                <Infobox {...el} />
              </li>
            ))}
          </ul>
          {loadedItems < arr.length && (
            <div ref={ref}>
              {isLoading && (
                <PiSpinnerGapBold className="mx-auto mt-5 animate-spin text-[80px] text-text-gray-default" />
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex h-[400px] flex-col items-center justify-center gap-[10px]">
          <h3 className="text-[28px] font-semibold text-text-gray-dark dark:text-text-gray-light">
            검출된 취약점이 없어요
          </h3>
          <div className="text-center text-xl text-text-gray-default">
            <p>취약점이 발견되지 않았지만 새로 업데이트할 경우</p>
            <p>파일을 한 번 더 검사해주세요.</p>
          </div>
        </div>
      )}
    </div>
  );
}
