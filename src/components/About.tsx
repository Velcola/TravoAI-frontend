
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, Users, MapPin } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "1M+", label: "Happy Travelers" },
    { icon: MapPin, value: "200+", label: "Destinations" },
    { icon: Star, value: "4.9", label: "Average Rating" }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-white via-purple-25 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Travel Smarter with 
              <span className="text-purple-600"> Artificial Intelligence</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              TravoAI revolutionizes how you plan and book travel. Our proprietary AI engine 
              understands your preferences, learns from your choices, and delivers personalized 
              recommendations that save you time and money.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're planning a business trip, family vacation, or romantic getaway, 
              our platform connects you with the best deals from trusted partners worldwide.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Statistics</h3>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 shadow-xl rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Experience AI-Powered Travel?</h3>
              <p className="text-purple-100 mb-6">
                Join millions of travelers who trust TravoAI for their journey planning.
              </p>
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 rounded-xl font-semibold">
                Get Started Free
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
