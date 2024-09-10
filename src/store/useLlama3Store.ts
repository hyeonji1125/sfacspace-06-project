import { AnalysisResult, Llama3State } from "@/types/llama3";
import { create } from "zustand";
import { putData } from "@/hooks/fetchData";

export const useLlama3Store = create<Llama3State>((set) => ({
  isAnalyzing: false,
  analysisResults: [],
  error: null,
  startAnalysis: async (fileContents, userEmail) => {
    set({ isAnalyzing: true, error: null });
    try {
      const response = await fetch("/api/llama3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileContents,
          temperature: 0.7,
          top_p: 0.9,
        }),
      });

      if (!response.ok) throw new Error("Failed to get analysis");

      const data = await response.json();
      const analysisResults: AnalysisResult[] = data.response;
      set({ analysisResults: data.response, isAnalyzing: false });

      // Firestore에 결과 저장
      if (userEmail) {
        const savePromises = fileContents.map(async (file) => {
          const analysisResult = analysisResults.find(
            (result) => result.fileName === file.name
          );

          try {
            await putData(`users/${userEmail}/analysis-results`, file.path, {
              name: file.name,
              content: file.content,
              path: file.path,
              analysisResult: analysisResult || {
                fileName: file.name,
                isVulnerable: false,
                analysis: []
              },
            });
          } catch (error) {
            console.error(
              `Failed to save analysis result for file: ${file.name}`,
              error
            );
          }
        });

        await Promise.all(savePromises);
      } else {
        console.error("userEmail 찾을 수 없음");
      }
    } catch (error) {
      set({ error: (error as Error).message, isAnalyzing: false });
    }
  },
  setAnalysisResults: (results) => set({ analysisResults: results }),
  clearResults: () => set({ analysisResults: [], error: null }),
}));
