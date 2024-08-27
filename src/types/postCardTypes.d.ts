export type ChipsType = "new" | "hot" | "default";

export type PostCardType = {
  id: number;
  title: string;
  chips?: ChipsType;
  reportContent: string;
};

// SmallPostCardItem용 타입
export type SmallPostCardType = PostCardType & {
  date: string;
};

// MainPostCardItem용 타입
export type MainPostCardType = PostCardType & {
  date: string;
  company: string;
};

// 목업 데이터용 타입
export type MockPostCardTypes = PostCardType & {
  views: string;
  label?: string;
  date: Date | string | number;
  company: string;
};
