import { format, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

type DateType = Date | string | number;

export const formatRelativeTime = (date: DateType): string => {
  const d = new Date(date);
  const diffInSeconds = (Date.now() - d.getTime()) / 1000;

  return diffInSeconds < 60
    ? "방금 전"
    : formatDistanceToNowStrict(d, { addSuffix: true, locale: ko });
};

export const formatExactTime = (date: DateType): string => {
  return format(new Date(date), "yyyy.MM.dd HH:mm:ss");
};
