## 🔐 FlawDetector

| 제안기업 명 | ㈜스팩스페이스                         |
| ----------- | -------------------------------------- |
| 프로젝트 명 | 플로디텍터 – 보안시장 이슈 시스템 개발 |
| 실행 기간   | 2024.08.05.~2024.09.20. (7주)          |

<br />

## 📖 Flaw Detector란?

- 개발 중 발생할 수 있는 보안 취약점을 실시간으로 분석, 해결책을 제안하는 AI 기반 보안 솔루션입니다.
- GitHub 로그인을 통해 사용자의 레포지토리와 연동하여 소스코드의 보안 문제를 탐지하고, 최신 취약점 정보를 바탕으로 해결책을 제공합니다.

<br />

## 🌐 배포 사이트

[FlawDetector](https://sfacspace-06-project.vercel.app/)

<br />

## 🛠 주요 기능

1. 소스코드 보안 취약점 분석: GitHub 레포지토리의 소스코드에서 실시간 보안 취약점 분석.
2. 취약점 정보 제공: 최신 보안 취약점 데이터베이스를 기반으로 취약점 및 해결책 제공.
3. 취약점 DB 연동: 최신 보안 취약점 정보를 취합하여 제공.

<br />

## 🙋‍♂️ 어떻게 사용하나요?

- GitHub OAuth로 로그인하고 원하시는 서비스를 이용하실 수 있습니다.
  <br/><br/>

## 🙋‍♂️ 무엇을 이용할 수 있나요?

### 랜딩 페이지
<img src="https://github.com/user-attachments/assets/c72764a4-6e4b-4c36-9711-36520e667440"  width="740" height="350"/>
<img src="https://github.com/user-attachments/assets/39860169-5d37-4fe5-9130-3034d55f5c10"  width="740" height="350"/>

<br/>
<br/>

### 마이페이지
<img src="https://github.com/user-attachments/assets/2e05a250-60e9-4710-97ac-3eb1a0a7b6d8"  width="740" height="350"/>
<img src="https://github.com/user-attachments/assets/9a7d15e3-e7f1-4577-a156-5a03f325f0dd"  width="740" height="350"/>

<br/>
<br/>

### 취약점 DB (/vuldb/) (로그인 필요)
<img src="https://github.com/user-attachments/assets/e990a878-a685-4e77-9fed-cfe66086c4b7"  width="740" height="350"/>
<img src="https://github.com/user-attachments/assets/d9c0e67b-df41-4925-b0db-14cde046bc10"  width="350" height="350"/>

- 해당 페이지는 보안이슈 사례들을 Hot/New 키워드로 나뉘어 제공됩니다.
- 실시간 Topic 제공이 제공됩니다.
- 챗봇 기능이 제공됩니다.
- 검색기능이 제공됩니다.(무자본 프로젝트인만큼 검색기능은 일부 제한됩니다.)
  
<br/>
<br/>

### MY 저장소 (/repos) (로그인 필요)
<img src="https://github.com/user-attachments/assets/364d0236-2cab-41e9-992f-f334d0fad65a"  width="740" height="350"/>

- 깃허브에서 받아온 나의 레파지토리를 볼 수 있습니다.
- 레파지토리를 선택해 검사페이지로 이동 가능합니다.
- 정렬기능이 제공됩니다.<br/>(검사완료/검사중 , 최신/이름 ,최근 순,북마크 등)
- 레파지토리 북마크를 추가,삭제할 수 있습니다.

<br/>
<br/>

### 검사페이지 (/repos/[id])(로그인 필요)
<img src="https://github.com/user-attachments/assets/3e6830d5-c70d-4668-80fa-8cc12515613b"  width="740" height="350"/>
<img src="https://github.com/user-attachments/assets/46e72657-0229-46f2-a0ed-08191be29b2a"  width="740" height="350"/>

- 정렬기능이 제공됩니다.(폴더순/파일순/북마크순)
- 코드검사기능이 제공되고 검사결과를 볼 수 있습니다.<br/>
  (AI모델 성능이슈로 로딩이 길 수 있습니다.)
- 레파지토리의 파일 검사 통계를 볼 수 있습니다.
- 검사 진행 현황을 볼 수 있습니다(오류, 분석 중, 대기 중, 분석 완료)
- 파일 북마크를 추가,삭제 할 수 있습니다.

<br/>
<br/>

### Dark-Mode
<img src="https://github.com/user-attachments/assets/6a89dab6-eaf6-451c-9717-0db778b41a48"  width="740" height="350"/>

- 다크모드 기능이 제공됩니다.

<br />

## 💻 설치 및 실행 방법

### 설치 절차

1. 리포지토리를 클론합니다:
   ```
   git clone https://github.com/hyeonji1125/sfacspace-06-projectgeekhub.git
   cd sfacspace-06-project
   ```
2. 의존성을 설치합니다:
   ```
   npm install
   ```
3. 개발 서버를 실행합니다:
   ```
   npm run dev
   ```
4. 브라우저에서 http://localhost:3000을 열어 FlawDetector를 실행합니다.

<br />

## 📝 개발자 소개

🪓 재개발위원회 개발팀
|<img src="https://avatars.githubusercontent.com/u/112041983?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/75575781?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/105583352?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/123872085?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/147421540?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|:-:|
|유아름|고하나|허민석|김현지|신민호|
|aoooec<br/>[@aoooec](https://github.com/aoooec)|hannah_9<br/>[@ko9612](https://github.com/ko9612)|MinDDo<br/>[@HeoMinSeok](https://github.com/HeoMinSeok)|현지<br/>[@hyeonji1125](https://github.com/hyeonji1125)|minho shin<br/>[@minhoshin11](https://github.com/minhoshin11)|

<br />

<!-- ## 📄 저작권 및 사용권 정보

이 프로젝트는 []에 따라 배포됩니다. 자유롭게 사용 및 수정할 수 있지만, 저작권 고지를 유지해야 합니다.

<br />

## 📚 참고 및 출처

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs/installation)
- [GitHub REST API Documentation](https://docs.github.com/ko/rest)

<br /> -->

## 🛠 기술 스택

#### FrontEnd

  <img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white"> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

#### BackEnd

<img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/FirebaseStore-DD2C00?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/FirebaseAdmin-DD2C00?style=for-the-badge&logo=firebase&logoColor=white">

#### Deployment & AI Model

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"><img src="https://img.shields.io/badge/llama3-0866FF?style=for-the-badge&logo=facebook&logoColor=white">

#### Test

<img src="https://img.shields.io/badge/stroyBook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"><img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white">

#### Miscellaneous

<img src="https://img.shields.io/badge/GoogleTranslate-4285F4?style=for-the-badge&logo=Google Translate&logoColor=white"><img src="https://img.shields.io/badge/swr-000000?style=for-the-badge&logo=swr&logoColor=white"><img src="https://img.shields.io/badge/dateFns-770C56?style=for-the-badge&logo=datefns&logoColor=white">

<br />

## 🔄 버전 및 업데이트 정보

- 현재 버전: 1.0.0
- 최신 업데이트: 2024년 9월
- 다음 업데이트 예정 기능: 미정

<!-- ## Image -->
