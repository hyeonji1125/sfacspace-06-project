export type InquiryForm = {
  name: string;
  email: string;
  message: string;
}

export type InquiryState = {
  formData: InquiryForm;
  isSubmitting: boolean;
  setFormData: (field: keyof InquiryForm, value: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  submitForm: () => Promise<void>;
};