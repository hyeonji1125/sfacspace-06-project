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
      <ContactForm />
    </>
  );
}
