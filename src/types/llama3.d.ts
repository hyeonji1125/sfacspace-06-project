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
  analysisStatus: Record<string, NonNullable<RepositoryContent['status']>>;
  error: string | null;
  startAnalysis: (
    fileContents: RepositoryContent[],
    userEmail: string,
    repoId: string,
  ) => Promise<void>;
  fetchAnalysisResults: (userEmail: string, repoId: string) => Promise<Record<string, NonNullable<RepositoryContent['status']>>>;
  setAnalysisResults: (results: AnalysisResult[]) => void;
  clearResults: () => void;
};
