import { create } from "zustand";
import { InquiryForm, InquiryState } from "@/types/inquiry";

const iFormData: InquiryForm = {
  name: "",
  email: "",
  message: "",
};

export const useInquiryStore = create<InquiryState>((set, get) => ({
  formData: iFormData,
  isSubmitting: false,
  error: null,
  setFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  submitForm: async () => {
    const { formData, setIsSubmitting } = get();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        set({ error: `문의 전송에 실패했습니다.` });
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      set((state) => ({ formData: { ...state.formData, message: "" } }));
    } catch (error) {
      set({ error: `문의 전송에 실패했습니다. ${(error as Error)?.message}` });
    } finally {
      setIsSubmitting(false);
    }
  },
}));
