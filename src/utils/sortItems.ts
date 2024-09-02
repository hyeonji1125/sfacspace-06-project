const getDateTime = (date: string) => {
  const formatDate = new Date(date);
  return formatDate.getTime();
};

export const sortItems = <T extends { created_at: string; name: string }>(
  selectedSort: string,
  setRepos: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  if (selectedSort === "최신순") {
    setRepos((prev) =>
      [...prev].sort(
        (a, b) => getDateTime(b.created_at) - getDateTime(a.created_at),
      ),
    );
  } else if (selectedSort === "오래된순") {
    setRepos((prev) =>
      [...prev].sort(
        (a, b) => getDateTime(a.created_at) - getDateTime(b.created_at),
      ),
    );
  } else if (selectedSort === "이름순") {
    setRepos((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
  }
};
