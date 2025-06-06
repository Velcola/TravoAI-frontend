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

  const hotelDestination = searchParams.get("hotelDestination") || null;

  const [flightOffers, setFlightOffers] = useState<any[]>([]);
  const [hotelOffers, setHotelOffers] = useState<any[]>([]);
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
            
              setFlightOffers(response)
            break;
          case "hotels":
            queryParams = new URLSearchParams({
              city: hotelDestination
            });

            response = await fetch(`${API_URL}/hotels?${queryParams.toString()}`, { method: 'GET', })
              .then(data => data.json());
            
            setHotelOffers(response)
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

  function formatDuration(isoDuration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = isoDuration.match(regex);

    if (!matches) return isoDuration; // fallback if format unexpected

    const hours = matches[1] ? `${matches[1]}h` : "";
    const minutes = matches[2] ? ` ${matches[2]}m` : "";

    return (hours + minutes).trim();
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
            Found {searchType === "flights" ? flightOffers.length : hotelOffers.length} great options for your trip
          </p>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {searchType === "flights" ? (
            flightOffers.map((offer) => (
              <Card
                key={offer.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      {/* Airline Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">Offer #{offer.id}</h3>
                        </div>
                      </div>

                      {/* Itinerary Info */}
                      <div className="flex flex-col gap-6">
                        {offer.itineraries.map((itinerary, index) => (
                          <div key={index} className="space-y-4">
                            <div className="text-sm text-gray-500">Duration: {formatDuration(itinerary.duration)}</div>
                            {itinerary.segments.map((segment, segIndex) => (
                              <div
                                key={segIndex}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border border-gray-200 p-4 rounded-xl"
                              >
                                {/* Departure */}
                                <div>
                                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Departure</span>
                                  </div>
                                  <div className="font-semibold">
                                    {new Date(segment.departure.at).toLocaleString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </div>
                                  <div className="text-gray-600">
                                    {segment.departure.iataCode}
                                    {segment.departure.terminal && ` (Terminal ${segment.departure.terminal})`}
                                  </div>
                                </div>

                                {/* Flight Info */}
                                <div className="text-center">
                                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                                    <Plane className="w-4 h-4" />
                                    <span>{segment.carrierCode} {segment.flightNumber}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">{segment.duration.replace("PT", "")}</div>
                                  <div className="text-xs text-gray-500">{segment.numberOfStops} stops</div>
                                </div>

                                {/* Arrival */}
                                <div>
                                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Arrival</span>
                                  </div>
                                  <div className="font-semibold">
                                    {new Date(segment.arrival.at).toLocaleString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </div>
                                  <div className="text-gray-600">
                                    {segment.arrival.iataCode}
                                    {segment.arrival.terminal && ` (Terminal ${segment.arrival.terminal})`}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="text-center lg:text-right shrink-0 w-full lg:w-auto flex flex-col justify-center items-center lg:items-end gap-2 p-4 rounded-xl bg-white/50 shadow-sm">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        ${offer.price.total} {offer.price.currency}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">per person</div>
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl px-6 py-2 w-full lg:w-auto max-w-[200px]">
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            hotelOffers.map((hotel) => (
              <Card
    key={hotel.hotelId}
    className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02]"
  >
    <CardContent className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image placeholder */}
        <div className="w-full lg:w-64 h-48 bg-gray-200 rounded-xl overflow-hidden">
          <img
            src="/placeholder.svg"
            alt={hotel.hotelName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {hotel.hotelName}
              </h3>

              {/* Star rating (mock) */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
                <span className="text-sm text-gray-500">(4.0)</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3">
                A modern and comfortable hotel located near the city center. Perfect for both business and leisure travelers.
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded-full">Free Wi-Fi</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">Breakfast Included</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">24h Reception</span>
              </div>

              {/* Location info */}
              <p className="text-sm text-gray-500">1.2 km from city center</p>
            </div>

            {/* Price section */}
            <div className="text-right lg:text-left">
              <p className="text-xl font-bold text-gray-800 mb-1">€99/night</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm">
                View Deal
              </button>
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