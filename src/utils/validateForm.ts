import { InquiryForm, ValidationRule } from "@/types";

const CONTACT_VALIDATION_RULES: Record<keyof InquiryForm, ValidationRule> = {
  name: {
    required: true,
    errorMessage: "이름을 입력해주세요.",
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: "올바른 이메일 주소를 입력해주세요.",
  },
  message: {
    required: true,
    errorMessage: "문의 내용을 입력해주세요.",
  },
};

export const validateForm = (e: React.FormEvent) => {
  let isValid = true;

  for (const field in CONTACT_VALIDATION_RULES) {
    const inputEl = document.querySelector(`[name="${field}"]`) as
      | HTMLInputElement
      | HTMLTextAreaElement;
    const rules = CONTACT_VALIDATION_RULES[field as keyof InquiryForm];

    if (!inputEl) return;

    if (rules.required && inputEl.value.trim() === "") {
      inputEl.setCustomValidity(rules.errorMessage);
      inputEl.reportValidity();
      isValid = false;
    } else if (rules.pattern && !rules.pattern.test(inputEl.value)) {
      inputEl.setCustomValidity(rules.errorMessage);
      inputEl.reportValidity();
      isValid = false;
    } else {
      inputEl.setCustomValidity("");
      inputEl.reportValidity();
    }
  }

  return isValid;
};
