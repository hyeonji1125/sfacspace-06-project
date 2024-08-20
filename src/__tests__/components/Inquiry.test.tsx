import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Inquiry from '@/app/(home)/_components/Inquiry';
import { useInquiryStore } from '@/store/useInquiryStore';
import { InquiryState } from '@/types';

// 모킹을 위한 설정
jest.mock('@/components/common/Input', () => ({ ...props }: { [key: string]: any }) => <input {...props} />);
jest.mock('@/components/common/Textarea', () => ({ ...props }: { [key: string]: any }) => <textarea {...props} />);
jest.mock('@/components/common/Button', () => ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <button {...props}>{children}</button>);

// useInquiryStore 모킹
jest.mock('@/store/useInquiryStore');

const mockSetFormData = jest.fn();
const mockSubmitForm = jest.fn();
const mockSetIsSubmitting = jest.fn();

const mockUseInquiryStore = useInquiryStore as jest.MockedFunction<typeof useInquiryStore>;

describe('Inquiry Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInquiryStore.mockReturnValue({
      formData: { name: '', email: '', message: '' },
      isSubmitting: false,
      setFormData: mockSetFormData,
      submitForm: mockSubmitForm,
      setIsSubmitting: mockSetIsSubmitting,
    } as unknown as InquiryState);
  });

  it('UI 렌더링 테스트', () => {
    render(<Inquiry />);
    expect(screen.getByText('서비스이용에 문제가 생겼나요?')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByText('문의 보내기')).toBeInTheDocument();
  });

  it('사용자의 입력 업데이트 테스트', () => {
    render(<Inquiry />);
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    expect(mockSetFormData).toHaveBeenCalledWith('name', 'John Doe');

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    expect(mockSetFormData).toHaveBeenCalledWith('email', 'john@example.com');

    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } });
    expect(mockSetFormData).toHaveBeenCalledWith('message', 'Test message');
  });

  it('문의 Form 제출 테스트', async () => {
    render(<Inquiry />);
    
    fireEvent.click(screen.getByText('문의 보내기'));

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled();
    });
  });

  it('Form 제출 중 제출 버튼 비활성화 및 로딩 텍스트 출력 테스트', () => {
    mockUseInquiryStore.mockReturnValue({
      formData: { name: '', email: '', message: '' },
      isSubmitting: true,
      setFormData: jest.fn(),
      submitForm: jest.fn(),
      setIsSubmitting: jest.fn(),
    } as unknown as InquiryState);

    render(<Inquiry />);
    
    const submitButton = screen.getByText('전송 중...');
    expect(submitButton).toBeDisabled();
  });
});
