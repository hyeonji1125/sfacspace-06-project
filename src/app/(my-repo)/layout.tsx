import PcOnlyMessage from "@/components/common/PcOnlyMessage";

export default function MyRepoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PcOnlyMessage />
      <div className="hidden w-full items-center justify-center xl:flex">
        {children}
      </div>
    </>
  );
}
