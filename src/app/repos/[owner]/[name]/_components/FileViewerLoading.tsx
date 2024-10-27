import { useMemo } from "react";

export default function FileViewerLoading({
  itemCount = 5,
}: {
  itemCount?: number;
}) {
  const getRandomWidth = () => {
    const min = 20;
    const max = 100;
    return `${Math.floor(Math.random() * (max - min + 1)) + min}%`;
  };

  const widths = useMemo(
    () => Array.from({ length: itemCount }).map(() => getRandomWidth()),
    [itemCount],
  );

  return (
    <ul className={`w-full animate-pulse space-y-3`}>
      {widths.map((width, idx) => (
        <li
          key={idx}
          className={`h-4 rounded-full bg-grayscale-10 dark:bg-grayscale-80`}
          style={{ width }}
        />
      ))}
    </ul>
  );
}
