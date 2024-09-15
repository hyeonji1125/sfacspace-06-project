import FindingFlawSection from "./_components/FindingFlawSection";
import HeroSection from "./_components/HeroSection";
import ContactForm from "./_components/Inquiry";
import NewestTrendSection from "./_components/NewestTrendSection";
import SecureProcessSection from "./_components/SecureProcessSection";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <HeroSection />
      </div>
      <FindingFlawSection />
      <NewestTrendSection />
      <SecureProcessSection />
      <div className="">
        <ContactForm />
      </div>
    </>
  );
}
