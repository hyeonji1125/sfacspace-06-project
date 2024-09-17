import PcOnlyMessage from "@/components/common/PcOnlyMessage";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PcOnlyMessage />
      <div className="mx-auto mb-[124px] mt-[72px] hidden w-full min-w-[1024px] max-w-[1314px] flex-col items-center gap-[124px] px-20 xl:flex">
        {children}
      </div>
    </>
  );
}
