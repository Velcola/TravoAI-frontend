
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, Search, MapPin, Calendar, Users, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Clock, Thermometer, Heart } from "lucide-react";

const Hero = () => {
  const [searchType, setSearchType] = useState("flights");

  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(""); // int?

  const [hotelDestination, setHotelDestination] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState("");
  const [hotelCheckOut, setHotelCheckOut] = useState("");
  const [hotelGuests, setHotelGuests] = useState(""); // int?

  const [recommendationDepartureLocation, setRecommendationDepartureLocation] = useState("");
  const [recommendationStartDate, setRecommendationStartDate] = useState("");
  const [recommendationEndDate, setRecommendationEndDate] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [temperaturePreference, setTemperaturePreference] = useState("");
  const [interests, setInterests] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    let queryParams;

    if(searchType === "recommendation") {
      queryParams = new URLSearchParams({
        departureLocation: recommendationDepartureLocation,
        startDate: recommendationStartDate,
        endDate: recommendationEndDate,
        adults: adults,
        travelMonth: travelMonth,
        interests: interests,
        travelStyle: travelStyle,
        temperaturePreference: temperaturePreference,
      });

      navigate(`/recommendation?${queryParams.toString()}`);
    } else {

      switch (searchType) {
        case "flights":
          if(!departureAirport || !arrivalAirport || !departureDate || !returnDate || !adults) {
            return;
          }
  
          queryParams = new URLSearchParams({
            type: searchType,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            startDate: departureDate,
            endDate: returnDate,
            adults: adults,
          });
          break;
        case "hotels":
          if(!hotelDestination) {
            return;
          }
          
          // TODO!!!!!!
          queryParams = new URLSearchParams({
              type: searchType,
              hotelDestination: hotelDestination,
            });

          break;
        default:
          return;
      }
  
      console.log('====================================');
            console.log(queryParams.toString());
            console.log('====================================');
      navigate(`/search?${queryParams.toString()}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-purple-600/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Travo<span className="text-purple-600">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover your perfect journey with AI-powered travel planning. 
            Find the best flights and hotels tailored just for you.
          </p>
        </div>

        {/* Search Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl p-8 mx-auto max-w-4xl">
          <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-purple-100 rounded-2xl p-1">
              <TabsTrigger 
                value="flights" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md transition-all duration-200"
              >
                <Plane className="w-4 h-4 mr-2" />
                Flights
              </TabsTrigger>
              <TabsTrigger 
                value="hotels" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md transition-all duration-200"
              >
                <Hotel className="w-4 h-4 mr-2" />
                Hotels
              </TabsTrigger>
              <TabsTrigger 
                value="recommendation" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md transition-all duration-200"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Recommendation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="space-y-6 mb-5">
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Departure Airport" 
                        value={departureAirport}
                        onChange={(e) => setDepartureAirport(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Destination Airport" 
                        value={arrivalAirport}
                        onChange={(e) => setArrivalAirport(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Departure</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Return</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-1 col-span-full flex justify-center">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Adults</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="1 Adult" 
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                          className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>


            <TabsContent value="hotels" className="space-y-6 mb-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="City or hotel name" 
                      value={hotelDestination}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendation" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Departure Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={recommendationDepartureLocation}
                      onChange={(e) => setRecommendationDepartureLocation(e.target.value)}
                      placeholder="Where are you departing from?" 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Travel Month</label>
                  <div className="relative">
                    <Sun className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      value={travelMonth}
                      onChange={(e) => setTravelMonth(e.target.value)}
                      placeholder="e.g., January, March..." 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={recommendationStartDate}
                      onChange={(e) => setRecommendationStartDate(e.target.value)}
                      type="date"
                      placeholder="e.g., 7 days, 2 weeks..." 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={recommendationEndDate}
                      onChange={(e) => setRecommendationEndDate(e.target.value)}
                      type="date"
                      placeholder="e.g., 7 days, 2 weeks..." 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Travel Style</label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={travelStyle}
                      onChange={(e) => setTravelStyle(e.target.value)}
                      placeholder="e.g., romantic, relaxing, adventure..." 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Temperature Preference</label>
                  <div className="relative">
                    <Thermometer className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      value={temperaturePreference}
                      onChange={(e) => setTemperaturePreference(e.target.value)}
                      placeholder="warm, cool, or mild" 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Adults</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="number"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      placeholder="Number of adults" 
                      className="pl-10 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Interests</label>
                  <Textarea
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Tell us about your interests... (e.g., history, food, nightlife, nature, art, shopping)" 
                    className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>

            <Button 
              onClick={handleSearch}
              className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Search className="w-5 h-5 mr-2" />
              Search with AI
            </Button>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
