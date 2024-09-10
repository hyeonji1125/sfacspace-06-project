/* 분석 결과 Type */
export type AnalysisResult = {
  fileName: string;
  isVulnerable: boolean;  
  language: string;
  analysis: {
    title: string;
    description: string;
    suggestion: string;
    vulnerabilityCode: string,
    /* 추후 필요하면 추가 */
  }[];
};

export type Llama3State = {
  isAnalyzing: boolean;
  analysisResults: AnalysisResult[];
  error: string | null;
  startAnalysis: (
    fileContents: RepositoryContent[],
    userEmail: string
  ) => Promise<void>;
  setAnalysisResults: (results: AnalysisResult[]) => void;
  clearResults: () => void;
};
