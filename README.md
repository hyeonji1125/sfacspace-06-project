# sfacspace-06-project
### 🐣 브랜치 전략

- main ← dev ← feat or fix
- `feat/이름-featureName`
    - `feat/minho-Nav`
- bug fix: `fix/이름-내용`


### 🐣 커밋 / PR / 이슈

- [커밋 종류]: [작업 내용] ([이슈 번호])
eg) `feat: Auth context 훅 생성(#3)`
- 커밋 종류는 소문자 사용

```
// 주요 
feat 새로운 기능 추가
fix 버그 수정
docs 문서 수정, 추가
test 테스트 코드 추가, 수정, 삭제
refact 코드 리팩토링
style 코드 의미에 영향을 주지 않는 변경사항 (코드 스타일, 포맷 수정, 줄 바꿈 등)
design CSS 등 사용자 UI 디자인을 추가, 수정한 경우
chore 빌드 부분 혹은 패키지 매니저 수정사항

// 그 외 
add
feat 이외의 부수적인 코드, 라이브러리 등을 추가한 경우
새로운 파일(Component나 Activity 등)을 생성한 경우도 포함

remove
코드, 파일을 삭제한 경우, 필요 없는 주석 삭제도 포함

move
fix, refactor 등과 관계 없이 코드, 파일 등의 위치를 이동하는 작업만 수행한 경우

comment
필요한 주석을 추가, 수정한 경우(❗필요 없는 주석을 삭제한 경우는 remove)

rename
파일명 수정
```

### 🐣 approve / merge

- 2명 이상 approve시 merge
- merge는 당사자가 직접!
- 코드 리뷰?
- 디스코드 연결
- merge 후
    - PR merge 알림(디스코드 팀 봇)이 오면, 충돌을 방지하기 위해 fetch 또는 pull 해주세요!
    - 이후 PR을 올리는 팀원은 메인을 pull 했는지 확인 후 컨플릭트 해결하고 PR 요청합니다.
    - Merge된 브랜치는 삭제합니다.
    - 브랜치 삭제 방법
        - 원격 삭제 `git push <remote> --delete <branch>` 또는 `git push <remote> :<branch>`
        ex) `git push origin --delete feature-areum-01`
        - 로컬 삭제 `git branch -d <branch>`
        - 또는 github pr페이지 자체에서 이미 머지된 branch는 아래에 `delete branch` 버튼이 있으니 이거 이용하셔도 됩니다!
