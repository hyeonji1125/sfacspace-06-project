import { AnalysisResult, Llama3State } from "@/types/llama3";
import { create } from "zustand";
import { getData, putData } from "@/hooks/fetchData";
import { RepositoryContent } from "@/types";
import { getLineNumber } from "@/utils/getLineNumber";

export const useLlama3Store = create<Llama3State>((set) => ({
  isAnalyzing: false,
  analysisResults: [],
  analysisStatus: [],
  error: null,
  startAnalysis: async (fileContents, userEmail, repoId) => {
    set({ isAnalyzing: true, error: null });

    // 첫 번째 파일은 'inprogress', 나머지는 'pending'으로 설정
    const initialStatus = fileContents.reduce(
      (acc, file, index) => {
        acc[file.path] = index === 0 ? "inprogress" : "pending";
        return acc;
      },
      {} as Record<string, NonNullable<RepositoryContent["status"]>>,
    );
    set((state) => ({
      analysisStatus: { ...state.analysisStatus, ...initialStatus },
    }));
    try {
      for (let i = 0; i < fileContents.length; i++) {
        const file = fileContents[i];

        set((state) => ({
          analysisStatus: {
            ...state.analysisStatus,
            [file.path]: "inprogress",
          },
        }));

        // 1개의 파일씩 분석 요청
        const response = await fetch("/api/llama3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileContents: [file], 
            temperature: 0.7,
            top_p: 0.9,
          }),
        });

        if (!response.ok) throw new Error("Failed to get analysis");

        const data = await response.json();
        const analysisResult: AnalysisResult = data.response[0]; // 단일 파일 결과

        // 줄 번호 계산 및 추가
        const updatedAnalysis = analysisResult.analysis.map(item => ({
          ...item,
          location: getLineNumber(file.content, item.vulnerabilityCode)
        }));
      
        const updatedAnalysisResult = {
          ...analysisResult,
          analysis: updatedAnalysis
        };

        // 분석 결과 업데이트
        set((state) => ({
          analysisResults: [...state.analysisResults, updatedAnalysisResult],
          analysisStatus: {
            ...state.analysisStatus,
            [file.path]: updatedAnalysisResult ? "completed" : "error",
          },
        }));

        // Firestore에 결과 저장
        if (userEmail) {
          try {
            await putData(
              `users/${userEmail}/analysis-results/${repoId}`,
              file.path,
              {
                name: file.name,
                content: file.content,
                path: file.path,
                analysisResult: updatedAnalysisResult,
              },
            );
          } catch (error) {
            console.error(
              `Failed to save analysis result for file: ${file.name}`,
              error,
            );
          }
        }
      }
    } catch (error) {
      set({ error: (error as Error).message, isAnalyzing: false });
    }
  },
  fetchAnalysisResults: async (userEmail: string, repoId: string) => {
    try {
      const results = await getData(
        `users/${userEmail}/analysis-results/${repoId}`,
      );
      const analysisStatus: Record<
        string,
        NonNullable<RepositoryContent["status"]>
      > = {};

      if (Array.isArray(results)) {
        results.forEach((doc) => {
          const { path, analysisResult } = doc;
          if (path && analysisResult) analysisStatus[path] = analysisResult ? "completed" : "error";     
        });
        set({ analysisResults: results, analysisStatus });
      } else {
        console.error("Unexpected data structure returned from getData");
      }

      return analysisStatus;
    } catch (error) {
      console.error("Failed to fetch analysis results:", error);
      set({ error: (error as Error).message });
      return {};
    }
  },
  setAnalysisResults: (results) => set({ analysisResults: results }),
  clearResults: () => set({ analysisResults: [], error: null }),
}));
