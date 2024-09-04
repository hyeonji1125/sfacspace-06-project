import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Inquiry from '@/app/(home)/_components/Inquiry';
import { useInquiryStore } from '@/store/useInquiryStore';
import { InquiryState } from '@/types';
import { useSession } from 'next-auth/react';

// 모킹 설정
jest.mock('@/components/common/Input', () => {
  const MockInput = (props: { [key: string]: any }) => <input {...props} />;
  MockInput.displayName = 'MockInput';
  return MockInput;
});

jest.mock('@/components/common/Textarea', () => {
  const MockTextarea = (props: { [key: string]: any }) => <textarea {...props} />;
  MockTextarea.displayName = 'MockTextarea';
  return MockTextarea;
});

jest.mock('@/components/common/Button', () => {
  const MockButton = ({ children, ...props }: { children: React.ReactNode;[key: string]: any }) => <button {...props}>{children}</button>;
  MockButton.displayName = 'MockButton';
  return MockButton;
});

jest.mock('@/store/useInquiryStore');
jest.mock('next-auth/react');

const mockSetFormData = jest.fn();
const mockSubmitForm = jest.fn();
const mockSetIsSubmitting = jest.fn();

const mockUseInquiryStore = useInquiryStore as jest.MockedFunction<typeof useInquiryStore>;
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

describe('Inquiry Component', () => {
  const initialState: InquiryState = {
    formData: { name: '', email: '', message: '' },
    isSubmitting: false,
    setFormData: mockSetFormData,
    submitForm: mockSubmitForm,
    setIsSubmitting: mockSetIsSubmitting,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInquiryStore.mockReturnValue(initialState);
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });
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
      ...initialState,
      isSubmitting: true,
    });

    render(<Inquiry />);

    const submitButton = screen.getByText('전송 중...');
    expect(submitButton).toBeDisabled();
  });

  it('인증된 사용자의 이름과 이메일이 자동으로 채워지는지 테스트', async () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: 'John Doe', email: 'john@example.com' },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24시간 후 만료
      },
      status: 'authenticated',
      update: jest.fn(),
    });

    render(<Inquiry />);

    await waitFor(() => {
      expect(mockSetFormData).toHaveBeenCalledWith('name', 'John Doe');
      expect(mockSetFormData).toHaveBeenCalledWith('email', 'john@example.com');
    });
  });

  it('인증된 사용자의 경우 이메일 필드가 읽기 전용인지 테스트', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: 'John Doe', email: 'john@example.com' },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24시간 후 만료
      },
      status: 'authenticated',
      update: jest.fn(),
    });

    render(<Inquiry />);

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    expect(emailInput.readOnly).toBe(true);
  });
});