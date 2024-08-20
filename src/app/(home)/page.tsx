import FindindFlawSection from "./_components/FindindFlawSection";
import HeroSection from "./_components/HeroSection";
import NewestTrendSection from "./_components/NewestTrendSection";
import SecureProcessSection from "./_components/SecureProcessSection";
import ContactForm from "./_components/Inquiry";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewestTrendSection />
      <FindindFlawSection />
      <SecureProcessSection />
      <div className="px-4 sm:px-8 md:px-[60px] lg:px-[80px] xl:px-[90px] 2xl:px-[190px]">
        <ContactForm />
      </div>
    </>
  );
}
