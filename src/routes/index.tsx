import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import {
  About,
  Services,
  Projects,
  Process,
  Why,
  Testimonials,
  StyleGuide,
  FAQ,
  Contact,
  Footer,
} from "@/components/sections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Atelier — Architecture & Interior Design Studio" },
      {
        name: "description",
        content:
          "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship. A studio devoted to quiet luxury.",
      },
      { property: "og:title", content: "Atelier — Architecture & Interior Design Studio" },
      {
        property: "og:description",
        content:
          "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship. A studio devoted to quiet luxury.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Atelier Architecture & Interior Design",
          description:
            "Luxury architecture and interior design studio crafting timeless residential, commercial and hospitality spaces.",
          areaServed: ["Milano", "New York", "Tokyo"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Via della Spiga 12",
            addressLocality: "Milano",
            postalCode: "20121",
            addressCountry: "IT",
          },
        }),
      },
    ],
  }),
});

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.01,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-clay"
    />
  );
}

function Index() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main className="relative bg-cream">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Why />
        <Testimonials />
        <StyleGuide />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
