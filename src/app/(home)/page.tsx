import FindingFlawSection from "./_components/FindingFlawSection";
import HeroSection from "./_components/HeroSection";
import NewestTrendSection from "./_components/NewestTrendSection";
import SecureProcessSection from "./_components/SecureProcessSection";
import ContactForm from "./_components/Inquiry";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FindingFlawSection />
      <NewestTrendSection />
      <SecureProcessSection />
      <div className="">
        <ContactForm />
      </div>
    </>
  );
}
