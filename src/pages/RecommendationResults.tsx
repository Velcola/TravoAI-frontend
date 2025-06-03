import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Plane, Hotel, Camera, Utensils, Mountain } from "lucide-react";

const RecommendationResults = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Mock recommendation data
  const recommendation = {
    destination: "Santorini, Greece",
    country: "Greece",
    image: "/placeholder.svg",
    rating: 4.9,
    bestFor: ["Romantic", "Relaxing", "Photography"],
    highlights: ["Sunset Views", "White Architecture", "Wine Tasting", "Volcanic Beaches"],
    flightPrice: 450,
    hotelPrice: 189,
    description: "A perfect romantic getaway with stunning sunsets and charming white-washed buildings."
  };

  const mascotMessage = "Based on your preferences for a romantic and relaxing trip with warm weather, I highly recommend Santorini! The stunning sunsets, beautiful architecture, and peaceful atmosphere make it perfect for couples. The warm Mediterranean climate in your travel month will be ideal for exploring the charming villages and enjoying the local cuisine. 🌅✨";

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">TravoAI is analyzing your preferences...</p>
          <p className="text-sm text-gray-500 mt-2">Finding the perfect destination just for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Perfect Destination
          </h1>
          <p className="text-gray-600">
            TravoAI has found the ideal location based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Recommendation Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-64 rounded-t-2xl overflow-hidden">
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white rounded-xl px-3 py-1">
                      AI Recommended
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{recommendation.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{recommendation.destination}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{recommendation.country}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{recommendation.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Perfect For</h3>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.bestFor.map((item, index) => (
                          <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 rounded-lg">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {recommendation.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Camera className="w-4 h-4 text-purple-500" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Plane className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">Flights from</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">${recommendation.flightPrice}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Hotel className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">Hotels from</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">${recommendation.hotelPrice}/night</div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl py-3">
                      Book This Destination
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TravoAI Mascot Speech Bubble */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                    AI
                  </div>
                  <h3 className="font-bold text-gray-900">Captain Travo</h3>
                  <p className="text-sm text-purple-600">Your Travel Assistant</p>
                </div>
                
                <div className="relative">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 relative">
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-purple-50 border-l-2 border-t-2 border-purple-200 transform rotate-45"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {mascotMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResults;