import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useInquiryStore } from '@/store/useInquiryStore';

describe('useInquiryStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('초기 상태를 설정 테스트', () => {
    const { result } = renderHook(() => useInquiryStore());

    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('setFormData 호출 시 formData 업데이트 테스트', () => {
    const { result } = renderHook(() => useInquiryStore());

    act(() => {
      result.current.setFormData('name', 'John Doe');
    });

    expect(result.current.formData.name).toBe('John Doe');
  });

  it('setIsSubmitting 호출 시 isSubmitting 상태를 업데이트 테스트', () => {
    const { result } = renderHook(() => useInquiryStore());

    act(() => {
      result.current.setIsSubmitting(true);
    });

    expect(result.current.isSubmitting).toBe(true);
  });

  it('fetch 요청 실패 시 에러 처리 테스트', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Error'))) as jest.Mock;

    const { result } = renderHook(() => useInquiryStore());

    await act(async () => {
      await result.current.submitForm();
    });

    expect(window.alert).toHaveBeenCalledWith('Network Error');
  });

  it('catch 블록에서 비정상적인 에러 객체를 처리 테스트', async () => {
    global.fetch = jest.fn(() => Promise.reject('Some error string')) as jest.Mock;

    const { result } = renderHook(() => useInquiryStore());

    await act(async () => {
      await result.current.submitForm();
    });

    expect(window.alert).toHaveBeenCalledWith('Error');
  });

  it('Form을 성공 유무 및 Form 초기화 테스트', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Email sent successfully' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useInquiryStore());

    await act(async () => {
      result.current.setFormData('name', 'John Doe');
      result.current.setFormData('email', 'john@example.com');
      result.current.setFormData('message', 'Test message');
      await result.current.submitForm();
    });

    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.anything());

    // 상태가 초기화되었는지 확인
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('Form 제출 실패했을 때 에러 메시지 처리 테스트', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to send email' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useInquiryStore());

    await act(async () => {
      result.current.setFormData('name', 'John Doe');
      result.current.setFormData('email', 'john@example.com');
      result.current.setFormData('message', 'Test message');
      await result.current.submitForm();
    });

    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.anything());

    // 에러 메시지가 제대로 처리되었는지 확인
    expect(window.alert).toHaveBeenCalledWith('Failed to send email');
    expect(result.current.isSubmitting).toBe(false);
  });
});
