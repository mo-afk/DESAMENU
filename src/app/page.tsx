import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import VenueStrip from "@/components/sections/VenueStrip";
import ValueStrip from "@/components/sections/ValueStrip";
import FeatureGrid from "@/components/sections/FeatureGrid";
import DemoShowcase from "@/components/sections/DemoShowcase";
import WhyDesa from "@/components/sections/WhyDesa";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <VenueStrip />
        <ValueStrip />
        <FeatureGrid />
        <DemoShowcase />
        <WhyDesa />
        <HowItWorks />
        <UseCases />
        <CtaBanner />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
