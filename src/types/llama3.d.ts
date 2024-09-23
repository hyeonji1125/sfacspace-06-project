/* 분석 결과 Type */
export type resultType = {
  title: string;
  description: string;
  suggestion: string;
  vulnerabilityCode: string;
  lineNumber: number;
};

export type AnalysisResult = {
  fileName: string;
  isVulnerable: boolean;
  language: string;
  analysis: resultType[];
  path: string;
  analysisResult: AnalysisResult;
};

export type Llama3State = {
  isAnalyzing: boolean;
  analysisResults: AnalysisResult[];
  focusedLocation: string | null;
  analysisStatus: Record<string, NonNullable<RepositoryContent["status"]>>;
  error: string | null;
  startAnalysis: (
    fileContents: RepositoryContent[],
    userEmail: string,
    repoId: string,
  ) => Promise<void>;
  fetchAnalysisResults: (
    userEmail: string,
    repoId: string,
  ) => Promise<Record<string, NonNullable<RepositoryContent["status"]>>>;
  setAnalysisResults: (results: AnalysisResult[]) => void;
  setFocusedLocation: (title: string | null) => void;
  clearResults: () => void;
};
