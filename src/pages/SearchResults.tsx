import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel, Clock, MapPin, Users, Star, ArrowLeft, Wifi, Car, Coffee } from "lucide-react";

const API_URL = "http://localhost:3000";

const SearchResults = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchType = searchParams.get("type") || "flights";
  const departureCity = searchParams.get("departureAirport") || null;
  const destinationCity = searchParams.get("arrivalAirport") || null;
  const departureDate = searchParams.get("startDate") || null;
  const returnDate = searchParams.get("endDate") || null;
  const adults = searchParams.get("adults") || null;

  console.log('====================================');
  console.log(searchType);
  console.log(departureCity);
  console.log(destinationCity);
  console.log(departureDate);
  console.log(adults);
  console.log('====================================');

  // Mock data for demonstration
  const mockFlights = [
    {
      id: 1,
      airline: "SkyWings Airlines",
      departure: "New York (JFK)",
      arrival: "Los Angeles (LAX)",
      departureTime: "08:30 AM",
      arrivalTime: "11:45 AM",
      duration: "5h 15m",
      price: 299,
      stops: "Non-stop",
      rating: 4.8
    },
    {
      id: 2,
      airline: "CloudJet",
      departure: "New York (JFK)",
      arrival: "Los Angeles (LAX)",
      departureTime: "02:15 PM",
      arrivalTime: "5:30 PM",
      duration: "5h 15m",
      price: 249,
      stops: "Non-stop",
      rating: 4.6
    },
    {
      id: 3,
      airline: "AeroConnect",
      departure: "New York (JFK)",
      arrival: "Los Angeles (LAX)",
      departureTime: "06:45 PM",
      arrivalTime: "10:00 PM",
      duration: "5h 15m",
      price: 199,
      stops: "1 stop",
      rating: 4.4
    }
  ];

  const mockHotels = [
    {
      id: 1,
      name: "Grand Palace Resort",
      location: "Downtown Los Angeles",
      rating: 4.9,
      reviews: 1234,
      price: 189,
      originalPrice: 249,
      amenities: ["Wifi", "Pool", "Spa", "Parking"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "City View Hotel",
      location: "Hollywood",
      rating: 4.7,
      reviews: 856,
      price: 129,
      originalPrice: 159,
      amenities: ["Wifi", "Gym", "Restaurant"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Coastal Luxury Suites",
      location: "Santa Monica",
      rating: 4.8,
      reviews: 967,
      price: 299,
      originalPrice: 349,
      amenities: ["Wifi", "Beach Access", "Spa", "Valet"],
      image: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let response;
        let queryParams;
        switch(searchType) {
          case "flights":
            queryParams = new URLSearchParams({
              departureAirport: departureCity,
              arrivalAirport: destinationCity,
              startDate: departureDate,
              endDate: returnDate,
              adults: adults
            });

            response = await fetch(`${API_URL}/flights?${queryParams.toString()}`, { method: 'GET', })
              .then(data => data.json());
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            break;
          case "hotels":
            break;
          default:
            return;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': case 'valet': return <Car className="w-4 h-4" />;
      case 'restaurant': return <Coffee className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Finding the best {searchType} for you...</p>
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
            {searchType === "flights" ? "Flight" : "Hotel"} Results
          </h1>
          <p className="text-gray-600">
            Found {searchType === "flights" ? mockFlights.length : mockHotels.length} great options for your trip
          </p>
        </div>

        {/* Filters Bar */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 rounded-xl px-4 py-2">
                {searchType === "flights" ? <Plane className="w-4 h-4 mr-2" /> : <Hotel className="w-4 h-4 mr-2" />}
                {searchType === "flights" ? "Flights" : "Hotels"}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">Price: Low to High</Button>
                <Button variant="outline" size="sm" className="rounded-xl">Duration</Button>
                <Button variant="outline" size="sm" className="rounded-xl">Rating</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {searchType === "flights" ? (
            mockFlights.map((flight) => (
              <Card key={flight.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{flight.airline}</h3>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{flight.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span>Departure</span>
                          </div>
                          <div className="font-semibold">{flight.departureTime}</div>
                          <div className="text-gray-600">{flight.departure}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-gray-600 mb-1 justify-center">
                            <Clock className="w-4 h-4" />
                            <span>{flight.duration}</span>
                          </div>
                          <div className="text-xs text-gray-500">{flight.stops}</div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span>Arrival</span>
                          </div>
                          <div className="font-semibold">{flight.arrivalTime}</div>
                          <div className="text-gray-600">{flight.arrival}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <div className="text-3xl font-bold text-purple-600 mb-2">${flight.price}</div>
                      <div className="text-sm text-gray-600 mb-4">per person</div>
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl px-6">
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            mockHotels.map((hotel) => (
              <Card key={hotel.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-64 h-48 bg-gray-200 rounded-xl overflow-hidden">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{hotel.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="font-semibold">{hotel.rating}</span>
                            <span className="text-gray-600">({hotel.reviews} reviews)</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {hotel.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1">
                                <div className="flex items-center gap-1">
                                  {getAmenityIcon(amenity)}
                                  <span className="text-xs">{amenity}</span>
                                </div>
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-center lg:text-right">
                          <div className="text-2xl font-bold text-purple-600">${hotel.price}</div>
                          <div className="text-sm text-gray-400 line-through">${hotel.originalPrice}</div>
                          <div className="text-sm text-gray-600 mb-4">per night</div>
                          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl px-6">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;