import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MapPin, Navigation, Phone, Clock, Star, Hospital, Pill, FlaskConical, Stethoscope } from "lucide-react";
import { Input } from "./ui/input";

interface ServiceLocation {
  id: number;
  name: string;
  type: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  phone: string;
  openNow: boolean;
  hours: string;
  services?: string[];
}

const hospitals: ServiceLocation[] = [
  {
    id: 1,
    name: "City General Hospital",
    type: "Multi-Specialty Hospital",
    address: "123 Main Street, Downtown",
    distance: "2.3 km",
    rating: 4.5,
    reviews: 1234,
    phone: "+91 22 1234 5678",
    openNow: true,
    hours: "24/7",
    services: ["Emergency", "ICU", "Surgery", "Cardiology"]
  },
  {
    id: 2,
    name: "Community Health Center",
    type: "Primary Care",
    address: "456 Park Avenue, North District",
    distance: "3.8 km",
    rating: 4.3,
    reviews: 567,
    phone: "+91 22 2345 6789",
    openNow: true,
    hours: "8 AM - 10 PM",
    services: ["OPD", "Lab", "Pharmacy"]
  },
  {
    id: 3,
    name: "Rural Medical Clinic",
    type: "Clinic",
    address: "789 Village Road, Rural Area",
    distance: "5.2 km",
    rating: 4.0,
    reviews: 234,
    phone: "+91 22 3456 7890",
    openNow: false,
    hours: "9 AM - 6 PM",
    services: ["General Medicine", "Vaccination"]
  }
];

const pharmacies: ServiceLocation[] = [
  {
    id: 1,
    name: "Apollo Pharmacy",
    type: "24/7 Pharmacy",
    address: "12 Central Road",
    distance: "1.2 km",
    rating: 4.6,
    reviews: 890,
    phone: "+91 22 4567 8901",
    openNow: true,
    hours: "24/7"
  },
  {
    id: 2,
    name: "MedPlus",
    type: "Pharmacy Chain",
    address: "34 Market Street",
    distance: "2.5 km",
    rating: 4.4,
    reviews: 456,
    phone: "+91 22 5678 9012",
    openNow: true,
    hours: "8 AM - 11 PM"
  }
];

const labs: ServiceLocation[] = [
  {
    id: 1,
    name: "Dr. Lal PathLabs",
    type: "Diagnostic Center",
    address: "56 Health Plaza",
    distance: "1.8 km",
    rating: 4.5,
    reviews: 678,
    phone: "+91 22 6789 0123",
    openNow: true,
    hours: "7 AM - 7 PM",
    services: ["Blood Tests", "X-Ray", "Ultrasound", "ECG"]
  },
  {
    id: 2,
    name: "Thyrocare Diagnostics",
    type: "Laboratory",
    address: "78 Medical Center",
    distance: "3.1 km",
    rating: 4.3,
    reviews: 345,
    phone: "+91 22 7890 1234",
    openNow: true,
    hours: "6 AM - 8 PM",
    services: ["Blood Tests", "Health Checkups"]
  }
];

export default function NearbyServices() {
  const [selectedType, setSelectedType] = useState<string>("hospitals");
  const [searchQuery, setSearchQuery] = useState("");

  const getServices = () => {
    switch (selectedType) {
      case "hospitals": return hospitals;
      case "pharmacies": return pharmacies;
      case "labs": return labs;
      default: return hospitals;
    }
  };

  const filteredServices = getServices().filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGetDirections = (service: ServiceLocation) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(service.name + " " + service.address)}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Nearby Healthcare Services</h1>
        <p className="text-gray-600 mt-2">Find hospitals, pharmacies, and diagnostic centers near you</p>
      </div>

      {/* Map Placeholder */}
      <Card className="overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Interactive Map View</p>
              <p className="text-sm text-gray-500">Showing services within 10 km radius</p>
            </div>
          </div>
          {/* Map markers simulation */}
          <div className="absolute top-1/4 left-1/3">
            <div className="relative">
              <MapPin className="h-8 w-8 text-red-600 animate-bounce" />
              <Badge className="absolute -top-2 -right-2 bg-red-600">Hospital</Badge>
            </div>
          </div>
          <div className="absolute top-1/2 right-1/3">
            <div className="relative">
              <MapPin className="h-8 w-8 text-green-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <Badge className="absolute -top-2 -right-2 bg-green-600">Pharmacy</Badge>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-1/2">
            <div className="relative">
              <MapPin className="h-8 w-8 text-purple-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
              <Badge className="absolute -top-2 -right-2 bg-purple-600">Lab</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedType("hospitals")}>
          <CardContent className="p-6 text-center">
            <Hospital className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl">{hospitals.length}</p>
            <p className="text-sm text-gray-500">Hospitals</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedType("pharmacies")}>
          <CardContent className="p-6 text-center">
            <Pill className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl">{pharmacies.length}</p>
            <p className="text-sm text-gray-500">Pharmacies</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedType("labs")}>
          <CardContent className="p-6 text-center">
            <FlaskConical className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl">{labs.length}</p>
            <p className="text-sm text-gray-500">Diagnostic Labs</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Stethoscope className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl">24</p>
            <p className="text-sm text-gray-500">Clinics</p>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          <TabsTrigger value="labs">Diagnostic Labs</TabsTrigger>
        </TabsList>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Use My Location
          </Button>
        </div>

        <div className="space-y-4">
          {filteredServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{service.name}</CardTitle>
                      {service.openNow && (
                        <Badge variant="default" className="bg-green-600">Open Now</Badge>
                      )}
                    </div>
                    <CardDescription>{service.type}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                    <span className="text-sm text-gray-500">({service.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p>{service.address}</p>
                      <p className="text-blue-600">{service.distance} away</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Hours</p>
                      <p>{service.hours}</p>
                    </div>
                  </div>
                </div>

                {service.services && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Services Available</p>
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((s, idx) => (
                        <Badge key={idx} variant="outline">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleGetDirections(service)}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleCall(service.phone)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>

      {/* Filter Options */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline">Open 24/7</Button>
            <Button variant="outline">Emergency Services</Button>
            <Button variant="outline">Home Service</Button>
            <Button variant="outline">Online Booking</Button>
            <Button variant="outline">Insurance Accepted</Button>
            <Button variant="outline">Parking Available</Button>
            <Button variant="outline">Wheelchair Access</Button>
            <Button variant="outline">Top Rated</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
