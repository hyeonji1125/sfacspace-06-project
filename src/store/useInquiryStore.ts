import { create } from 'zustand';
import { InquiryForm, InquiryState } from '@/types/inquiry';

const iFormData: InquiryForm = {
  name: '',
  email: '',
  message: ''
};

export const useInquiryStore = create<InquiryState>((set, get) => ({
  formData: iFormData,
  isSubmitting: false,
  setFormData: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  })),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  submitForm: async () => {
    const { formData, setIsSubmitting } = get();

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      alert(data.message);
      set({ formData: iFormData }); 
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error');
    } finally {
      setIsSubmitting(false);
    }
  },
}));