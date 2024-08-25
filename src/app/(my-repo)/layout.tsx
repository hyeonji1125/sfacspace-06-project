export default function MyRepoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-[124px] mt-[72px] flex w-full min-w-[1024px] max-w-[1314px] flex-col items-center gap-[124px] px-20">
      {children}
    </div>
  );
}
