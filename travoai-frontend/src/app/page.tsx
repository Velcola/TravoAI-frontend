"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/button";
import { ArrowRight } from "lucide-react";
import { BackgroundLines } from "./components/ui/background-lines";
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "./components/ui/resizable-navbar";
import { useState } from "react";

export default function Home() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Register</NavbarButton>
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <main className="text-gray-900"> {/* Hero Section */} 
        <section className="relative z-0 h-[60vh] flex items-center justify-center overflow-hidden">
          <BackgroundLines className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 bg-transparent">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              Plan Your Perfect Flight — Powered by AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 text-center">
              TravoAI helps you discover and book the best flights in seconds, personalized just for you.
            </p>
            <div className="flex gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-xl">
                Get Started
              </Button>
              <Button className="bg-white text-indigo-600 border border-gray-300 hover:bg-gray-100 text-lg px-6 py-3 rounded-xl">
                Try a Demo
              </Button>
            </div>
          </BackgroundLines>
        </section>


        <section className="py-20 bg-white px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-2">✈️ Smart Suggestions</h3>
              <p className="text-gray-600">AI that learns your preferences and finds the perfect flight, every time.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">🕐 Real-Time Tracking</h3>
              <p className="text-gray-600">Stay updated on price changes and availability in real time.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">🌍 Personalized Itineraries</h3>
              <p className="text-gray-600">Smart planning that aligns with your schedule and interests.</p>
            </div>
          </div>
        </section> {/* Call to Action Section */} <section className="py-20 bg-indigo-600 text-white text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to fly smarter?</h2>
          <p className="text-lg mb-6">Join thousands of travelers already using TravoAI to plan the perfect trip.</p>
          <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 text-lg rounded-xl"> Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </section> {/* Footer */} <footer className="bg-gray-100 text-gray-600 text-sm py-6 text-center">
          <p>&copy; {new Date().getFullYear()} TravoAI. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
