import Inquiry from "@/app/(home)/_components/Inquiry";
import PageTitle from "@/components/common/PageTitle";

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 pb-6">
      <PageTitle>Customer Service center</PageTitle>
      <Inquiry />
    </div>
  );
}
