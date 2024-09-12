export default function EmptyContent({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 pb-16 pt-28">
      {icon}
      <p className="text-xl text-text-gray-dark dark:text-text-gray-default">
        {children}
      </p>
    </div>
  );
}
