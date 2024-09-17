export type ValidationRule = {
  required: boolean;
  errorMessage: string;
  pattern?: RegExp;
};

export type InquiryForm = {
  name: string;
  email: string;
  message: string;
};

export type InquiryState = {
  formData: InquiryForm;
  error: null | string;
  isSubmitting: boolean;
  setFormData: (field: keyof InquiryForm, value: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  submitForm: () => Promise<void>;
};
