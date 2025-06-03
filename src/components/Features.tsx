
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Shield, Heart, Globe, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Our advanced AI analyzes millions of options to find the perfect matches for your travel preferences and budget."
    },
    {
      icon: Zap,
      title: "Lightning Fast Search",
      description: "Get instant results from our optimized API that searches across hundreds of airlines and hotels simultaneously."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security, and our platform guarantees 99.9% uptime."
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Learn your preferences over time to provide increasingly personalized travel recommendations."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access to flights and accommodations worldwide, covering every destination you can dream of."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any questions or changes to your travel plans."
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-purple-600">TravoAI</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of travel planning with our cutting-edge AI technology 
            that makes finding your perfect trip effortless and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl rounded-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
