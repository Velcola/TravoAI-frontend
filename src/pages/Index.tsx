
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconExchange, IconHotelService, IconPlane, IconQuestionMark } from "@tabler/icons-react";

const Index = () => {
  const links = [
    {
      title: "Flights",
      icon: (
        <IconPlane className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Hotels",
      icon: (
        <IconHotelService className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "About Us",
      icon: (
        <IconQuestionMark className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <Hero />
      <Features />
      <About />
      <Footer />

      <FloatingDock
        mobileClassName="bottom-6 right-6" // bottom right on mobile
        desktopClassName="fixed bottom-6 left-1/2 -translate-x-1/2" // centered bottom on desktop
        items={links}
      />
    </div>
  );
};

export default Index;
