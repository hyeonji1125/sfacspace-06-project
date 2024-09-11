export function getLineNumber(
  fileContent: string,
  vulnerableCode: string,
): { startLine: number; endLine: number } {
  const lines = fileContent.split("\n");
  const vulnLines = vulnerableCode.trim().split("\n");

  let startLine = -1;
  let endLine = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(vulnLines[0].trim())) {
      startLine = i + 1;

      // 취약점 코드가 여러 줄인 경우
      if (vulnLines.length > 1) {
        let j;
        for (j = 1; j < vulnLines.length; j++) {
          if (
            i + j >= lines.length ||
            !lines[i + j].includes(vulnLines[j].trim())
          ) {
            break;
          }
        }
        endLine = i + j;
      } else {
        // 한 줄짜리 취약점 코드인 경우
        endLine = startLine;
      }
      break;
    }
  }

  // endLine이 설정되지 않았거나 startLine보다 작은 경우 조정
  if (endLine === -1 || endLine < startLine) {
    endLine = startLine;
  }

  return { startLine, endLine };
}
