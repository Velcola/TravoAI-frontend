
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconExchange, IconHotelService, IconPlane, IconQuestionMark } from "@tabler/icons-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
