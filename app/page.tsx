import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TemplatesShowcase />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}