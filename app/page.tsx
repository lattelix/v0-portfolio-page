import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { BentoExperience } from "@/components/bento-experience";
import { ProjectShowroom } from "@/components/project-showroom";
import { TechMarquee } from "@/components/tech-marquee";
import { ContactFooter } from "@/components/contact-footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BentoExperience />
      <ProjectShowroom />
      <TechMarquee />
      <ContactFooter />
    </main>
  );
}
