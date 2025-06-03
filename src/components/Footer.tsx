
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#" },
    { label: "Destinations", href: "#" },
    { label: "Travel Guides", href: "#" }
  ];

  const support = [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">
              Travo<span className="text-purple-400">AI</span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your intelligent travel companion, powered by AI to deliver personalized 
              travel experiences that exceed expectations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Get the latest travel deals and AI-powered recommendations.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 rounded-xl"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-500 rounded-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">support@travoai.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">Nordland County, Norway</span>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; 2024 TravoAI. All rights reserved. Powered by advanced AI technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
