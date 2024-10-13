import { AnalysisResult, Llama3State } from "@/types/llama3";
import { create } from "zustand";
import { getData, putData } from "@/hooks/fetchData";
import { RepositoryContent } from "@/types";
import { getLineNumber } from "@/utils/getLineNumber";

export const useLlama3Store = create<Llama3State>((set, get) => ({
  isAnalyzing: false,
  analysisResults: [],
  focusedLocation: null,
  analysisStatus: {},
  error: null,

  startAnalysis: async (fileContents, userEmail, repoId) => {
    set({ isAnalyzing: true, error: null, analysisResults: [] });

    // 모든 파일을 'pending'으로 초기화
    const initialStatus = fileContents.reduce(
      (acc, file) => {
        acc[file.path] = "pending";
        return acc;
      },
      {} as Record<string, NonNullable<RepositoryContent["status"]>>,
    );
    set({ analysisStatus: initialStatus });

    const updateFileStatus = (
      filePath: string,
      status: NonNullable<RepositoryContent["status"]>,
    ) => {
      set((state) => ({
        analysisStatus: {
          ...state.analysisStatus,
          [filePath]: status,
        },
      }));
    };

    const analyzeFile = async (file: {
      name: string;
      content: string;
      path: string;
    }) => {
      updateFileStatus(file.path, "inprogress");
      try {
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
        if (!data.response || !data.response[0] || !data.response[0].analysis) {
          throw new Error("Invalid response structure");
        }

        const analysisResult: AnalysisResult = data.response[0];

        // 정확한 줄 번호 계산 및 업데이트
        const updatedAnalysis = analysisResult.analysis.map((item) => ({
          ...item,
          lineNumber: getLineNumber(file.content, item.vulnerabilityCode),
        }));

        const updatedAnalysisResult = {
          ...analysisResult,
          analysis: updatedAnalysis,
          path: file.path,
        };

        // 분석 결과 업데이트
        set((state) => ({
          analysisResults: [...state.analysisResults, updatedAnalysisResult],
        }));

        updateFileStatus(file.path, "completed");

        // Firestore에 결과 저장
        if (userEmail) {
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
        }

        return updatedAnalysisResult;
      } catch (error) {
        console.error(`Failed to analyze file: ${file.name}`, error);
        updateFileStatus(file.path, "error");
        throw error;
      }
    };

    try {
      for (const file of fileContents) {
        await analyzeFile(file);
        // 다음 파일의 상태를 'next'로 설정
        const nextFileIndex = fileContents.indexOf(file) + 1;
        if (nextFileIndex < fileContents.length) {
          updateFileStatus(fileContents[nextFileIndex].path, "pending");
        }
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isAnalyzing: false });
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
          if (path && analysisResult) {
            analysisStatus[path] = "completed";
          }
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
  setFocusedLocation: (title) => set({ focusedLocation: title }),
  clearResults: () =>
    set({ analysisResults: [], error: null, analysisStatus: {} }),
}));
