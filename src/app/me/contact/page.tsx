import Inquiry from "@/app/(home)/_components/Inquiry";
import PageTitle from "@/components/common/PageTitle";
import PcOnlyMessage from "@/components/common/PcOnlyMessage";

export default function ContactPage() {
  return (
    <>
      <PcOnlyMessage />
      <div className="hidden w-full flex-col items-center gap-6 pb-6 xl:flex">
        <PageTitle>Customer Service center</PageTitle>
        <Inquiry />
      </div>
    </>
  );
}
