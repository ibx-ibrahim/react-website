import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Ambulance, Phone, MapPin, Clock, AlertTriangle, CheckCircle2, Navigation } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { toast } from "sonner@2.0.3";
import { Progress } from "./ui/progress";

interface EmergencyContact {
  name: string;
  number: string;
  type: string;
}

const emergencyContacts: EmergencyContact[] = [
  { name: "Ambulance (National)", number: "102", type: "Ambulance" },
  { name: "Police Emergency", number: "100", type: "Police" },
  { name: "Fire Department", number: "101", type: "Fire" },
  { name: "Women Helpline", number: "1091", type: "Women Safety" },
  { name: "Disaster Management", number: "108", type: "Disaster" },
  { name: "Senior Citizen Helpline", number: "14567", type: "Senior Care" }
];

const nearbyAmbulances = [
  {
    id: 1,
    name: "City General Ambulance",
    distance: "2.3 km",
    eta: "5 mins",
    type: "Advanced Life Support",
    available: true,
    hospital: "City General Hospital"
  },
  {
    id: 2,
    name: "Community Health Ambulance",
    distance: "3.8 km",
    eta: "8 mins",
    type: "Basic Life Support",
    available: true,
    hospital: "Community Health Center"
  },
  {
    id: 3,
    name: "Emergency Response Unit",
    distance: "4.5 km",
    eta: "10 mins",
    type: "Critical Care",
    available: false,
    hospital: "Emergency Medical Services"
  }
];

export default function EmergencyServices() {
  const [ambulanceRequested, setAmbulanceRequested] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const [estimatedArrival, setEstimatedArrival] = useState(5);
  const [currentLocation] = useState("Downtown, Mumbai - Coordinates: 19.0760° N, 72.8777° E");

  const handleEmergencyCall = (number: string, name: string) => {
    toast.success(`Calling ${name} at ${number}...`);
  };

  const handleRequestAmbulance = () => {
    setAmbulanceRequested(true);
    setTrackingActive(true);
    toast.success("Ambulance requested successfully! Help is on the way.");
    
    // Simulate tracking updates
    const interval = setInterval(() => {
      setEstimatedArrival(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTrackingActive(false);
          toast.success("Ambulance has arrived!");
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute
  };

  const handleShareLocation = () => {
    toast.success("Location shared with emergency services");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Emergency Services</h1>
        <p className="text-gray-600 mt-2">Quick access to emergency medical services and ambulance</p>
      </div>

      {/* Emergency Alert */}
      {trackingActive && (
        <Alert className="border-red-500 bg-red-50">
          <Ambulance className="h-4 w-4 text-red-600" />
          <AlertTitle>Ambulance En Route</AlertTitle>
          <AlertDescription>
            <div className="space-y-2 mt-2">
              <p>Estimated arrival: {estimatedArrival} minutes</p>
              <Progress value={(5 - estimatedArrival) * 20} className="h-2" />
              <p className="text-sm">Vehicle: City General Ambulance • Type: Advanced Life Support</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-500 border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                <Ambulance className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-red-600">Emergency Ambulance</CardTitle>
                <CardDescription>One-tap ambulance request</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700" 
              size="lg"
              onClick={handleRequestAmbulance}
              disabled={ambulanceRequested}
            >
              <Ambulance className="h-5 w-5 mr-2" />
              {ambulanceRequested ? "Ambulance Requested" : "Call Ambulance Now"}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Your location will be automatically shared
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Location</CardTitle>
            <CardDescription>Emergency services will use this location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{currentLocation}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleShareLocation}>
                <Navigation className="h-4 w-4 mr-2" />
                Share Location
              </Button>
              <Button variant="outline" className="flex-1">
                Update Location
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Ambulances */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Ambulance Services</CardTitle>
          <CardDescription>Available ambulances in your area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {nearbyAmbulances.map((ambulance) => (
            <div key={ambulance.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Ambulance className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p>{ambulance.name}</p>
                    <p className="text-sm text-gray-500">{ambulance.hospital}</p>
                  </div>
                </div>
                <Badge variant={ambulance.available ? "default" : "secondary"}>
                  {ambulance.available ? "Available" : "Busy"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Distance</p>
                  <p>{ambulance.distance}</p>
                </div>
                <div>
                  <p className="text-gray-500">ETA</p>
                  <p>{ambulance.eta}</p>
                </div>
                <div>
                  <p className="text-gray-500">Type</p>
                  <p>{ambulance.type}</p>
                </div>
              </div>

              <Button 
                className="w-full" 
                disabled={!ambulance.available}
                onClick={handleRequestAmbulance}
              >
                Request This Ambulance
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Helpline Numbers</CardTitle>
          <CardDescription>Quick dial emergency services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, idx) => (
              <Card key={idx} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{contact.type}</Badge>
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-lg mb-1">{contact.name}</h3>
                  <p className="text-2xl mb-3 text-blue-600">{contact.number}</p>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleEmergencyCall(contact.number, contact.name)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Emergency Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Emergency Guide</CardTitle>
          <CardDescription>Quick reference for common emergencies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "Heart Attack",
              symptoms: "Chest pain, shortness of breath, arm pain",
              action: "Call ambulance immediately, chew aspirin if available"
            },
            {
              title: "Stroke",
              symptoms: "Face drooping, arm weakness, speech difficulty",
              action: "Call ambulance immediately, note time of symptom onset"
            },
            {
              title: "Severe Bleeding",
              symptoms: "Uncontrolled bleeding from injury",
              action: "Apply direct pressure, elevate the wound, call for help"
            },
            {
              title: "Difficulty Breathing",
              symptoms: "Cannot breathe, turning blue",
              action: "Call ambulance, keep person calm and upright if possible"
            }
          ].map((guide, idx) => (
            <div key={idx} className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-900 mb-1">{guide.title}</h4>
                  <p className="text-sm text-gray-700 mb-1"><strong>Symptoms:</strong> {guide.symptoms}</p>
                  <p className="text-sm text-gray-700"><strong>Action:</strong> {guide.action}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Banner */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1697952431905-9c8d169d9d2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGVtZXJnZW5jeSUyMGFtYnVsYW5jZXxlbnwxfHx8fDE3NjI2MjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Emergency Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
          <div className="p-8 text-white">
            <h2 className="text-2xl mb-2">Every Second Counts</h2>
            <p className="mb-4">Quick access to emergency services can save lives</p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
