export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      result = func(...args);
    }, delay);
    return result;
  };
};
