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

    const initialStatus = Object.fromEntries(
      fileContents.map((file) => [file.path, "pending" as const])
    );
    set((state) => ({
      analysisStatus: { ...state.analysisStatus, ...initialStatus },
    }));

    try {
      const analysisPromises = fileContents.map(async (file) => {
        set((state) => ({
          analysisStatus: {
            ...state.analysisStatus,
            [file.path]: "inprogress",
          },
        }));

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
          if (!data.response || !Array.isArray(data.response) || data.response.length === 0) {
            throw new Error("Invalid response format");
          }

          const analysisResult: AnalysisResult = data.response[0];

          const updatedAnalysis = analysisResult.analysis.map((item) => ({
            ...item,
            location: getLineNumber(file.content, item.vulnerabilityCode),
          }));

          const updatedAnalysisResult = {
            ...analysisResult,
            analysis: updatedAnalysis,
          };

          if (userEmail) {
            await putData(
              `users/${userEmail}/analysis-results/${repoId}`,
              file.path,
              {
                name: file.name,
                content: file.content,
                path: file.path,
                analysisResult: updatedAnalysisResult,
              }
            );
          }

          return updatedAnalysisResult;
        } catch (error) {
          console.error(`Analysis failed for file: ${file.name}`, error);
          set((state) => ({
            analysisStatus: {
              ...state.analysisStatus,
              [file.path]: "error",
            },
          }));
          return null;
        }
      });

      const results = await Promise.all(analysisPromises);

      set((state) => ({
        analysisResults: results.filter((result): result is AnalysisResult => result !== null),
        analysisStatus: Object.fromEntries(
          fileContents.map((file) => [
            file.path,
            results[fileContents.indexOf(file)] ? "completed" : "error",
          ])
        ),
        isAnalyzing: false,
      }));
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
