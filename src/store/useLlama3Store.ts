import { Llama3State } from "@/types/llama3";
import { create } from "zustand";

export const useLlama3Store = create<Llama3State>((set) => ({
  isAnalyzing: false,
  analysisResults: [],
  error: null,
  startAnalysis: async (fileContents) => {
    set({ isAnalyzing: true, error: null});
    try{
      const response = await fetch('/api/llama3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContents,
          temperature: 0.7,
          top_p: 0.9,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get analysis');
      
      const data = await response.json();
      set({ analysisResults: data.response, isAnalyzing: false });
      
      // 여기에 FireStore DB에 저장하는 로직을 추가
    } catch (error) {
      set({ error: (error as Error).message, isAnalyzing: false });
    }
  },
  setAnalysisResults: (results) => set({ analysisResults: results }),
  clearResults: () => set({ analysisResults: [], error: null }),
}))