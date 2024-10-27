export function getLineNumber(
  fileContent: string,
  vulnerableCode: string
): number {
  const lines = fileContent.split("\n");
  const vulnLines = vulnerableCode.trim().split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(vulnLines[0].trim())) {
      // 취약점 코드의 첫 번째 줄이 일치하는 경우
      if (vulnLines.length === 1) {
        // 한 줄짜리 취약점 코드인 경우
        return i + 1;
      } else {
        // 여러 줄의 취약점 코드인 경우
        let allLinesMatch = true;
        for (let j = 1; j < vulnLines.length; j++) {
          if (
            i + j >= lines.length ||
            !lines[i + j].includes(vulnLines[j].trim())
          ) {
            allLinesMatch = false;
            break;
          }
        }
        if (allLinesMatch) {
          return i + 1; // 첫 번째 줄의 번호 반환
        }
      }
    }
  }

  return -1; // 일치하는 코드를 찾지 못한 경우
}