import PcOnlyMessage from "@/components/common/PcOnlyMessage";

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PcOnlyMessage />
      {children}
    </div>
  );
}
