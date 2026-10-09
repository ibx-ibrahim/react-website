import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Bed, Users, Activity, AlertCircle, CheckCircle, Clock, Hospital } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface HospitalAvailability {
  id: number;
  name: string;
  location: string;
  distance: string;
  generalBeds: { available: number; total: number };
  icuBeds: { available: number; total: number };
  ventilators: { available: number; total: number };
  emergencyWait: string;
  oxygenAvailable: boolean;
  bloodBank: boolean;
  lastUpdated: string;
}

const hospitals: HospitalAvailability[] = [
  {
    id: 1,
    name: "City General Hospital",
    location: "Downtown",
    distance: "2.3 km",
    generalBeds: { available: 45, total: 200 },
    icuBeds: { available: 8, total: 30 },
    ventilators: { available: 5, total: 15 },
    emergencyWait: "15 mins",
    oxygenAvailable: true,
    bloodBank: true,
    lastUpdated: "5 mins ago"
  },
  {
    id: 2,
    name: "Community Health Center",
    location: "North District",
    distance: "3.8 km",
    generalBeds: { available: 30, total: 100 },
    icuBeds: { available: 4, total: 15 },
    ventilators: { available: 2, total: 8 },
    emergencyWait: "10 mins",
    oxygenAvailable: true,
    bloodBank: false,
    lastUpdated: "3 mins ago"
  },
  {
    id: 3,
    name: "Rural Medical Clinic",
    location: "Village Road",
    distance: "5.2 km",
    generalBeds: { available: 12, total: 50 },
    icuBeds: { available: 0, total: 5 },
    ventilators: { available: 0, total: 3 },
    emergencyWait: "5 mins",
    oxygenAvailable: true,
    bloodBank: false,
    lastUpdated: "10 mins ago"
  },
  {
    id: 4,
    name: "Specialty Care Hospital",
    location: "East Zone",
    distance: "6.5 km",
    generalBeds: { available: 60, total: 250 },
    icuBeds: { available: 12, total: 40 },
    ventilators: { available: 8, total: 20 },
    emergencyWait: "20 mins",
    oxygenAvailable: true,
    bloodBank: true,
    lastUpdated: "2 mins ago"
  }
];

const departmentAvailability = [
  { name: "Cardiology", available: true, waitTime: "30 mins", doctors: 5 },
  { name: "Orthopedics", available: true, waitTime: "45 mins", doctors: 3 },
  { name: "Pediatrics", available: true, waitTime: "20 mins", doctors: 4 },
  { name: "Neurology", available: false, waitTime: "N/A", doctors: 0 },
  { name: "Emergency", available: true, waitTime: "15 mins", doctors: 8 },
  { name: "Surgery", available: true, waitTime: "60 mins", doctors: 6 }
];

export default function HospitalAvailability() {
  const [selectedHospital, setSelectedHospital] = useState<HospitalAvailability | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600";
    if (percentage > 20) return "text-yellow-600";
    return "text-red-600";
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "Good";
    if (percentage > 20) return "Limited";
    return "Critical";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Real-Time Hospital Availability</h1>
        <p className="text-gray-600 mt-2">Live updates on bed availability and hospital resources</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Hospitals</p>
                <p className="text-2xl mt-1">{hospitals.length}</p>
              </div>
              <Hospital className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Beds</p>
                <p className="text-2xl mt-1">
                  {hospitals.reduce((sum, h) => sum + h.generalBeds.available, 0)}
                </p>
              </div>
              <Bed className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">ICU Beds</p>
                <p className="text-2xl mt-1">
                  {hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0)}
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ventilators</p>
                <p className="text-2xl mt-1">
                  {hospitals.reduce((sum, h) => sum + h.ventilators.available, 0)}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
            >
              All Hospitals
            </Button>
            <Button
              variant={filterType === "beds" ? "default" : "outline"}
              onClick={() => setFilterType("beds")}
            >
              <Bed className="h-4 w-4 mr-2" />
              Beds Available
            </Button>
            <Button
              variant={filterType === "icu" ? "default" : "outline"}
              onClick={() => setFilterType("icu")}
            >
              <Activity className="h-4 w-4 mr-2" />
              ICU Available
            </Button>
            <Button
              variant={filterType === "oxygen" ? "default" : "outline"}
              onClick={() => setFilterType("oxygen")}
            >
              Oxygen Available
            </Button>
            <Button
              variant={filterType === "blood" ? "default" : "outline"}
              onClick={() => setFilterType("blood")}
            >
              Blood Bank
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{hospital.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span>{hospital.location} • {hospital.distance}</span>
                    <Badge variant="secondary" className="text-xs">
                      Updated {hospital.lastUpdated}
                    </Badge>
                  </CardDescription>
                </div>
                <Button onClick={() => setSelectedHospital(hospital)}>View Details</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* General Beds */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-gray-600" />
                      <span>General Beds</span>
                    </div>
                    <Badge variant={hospital.generalBeds.available > 0 ? "default" : "destructive"}>
                      {getAvailabilityStatus(hospital.generalBeds.available, hospital.generalBeds.total)}
                    </Badge>
                  </div>
                  <p className={`text-2xl ${getAvailabilityColor(hospital.generalBeds.available, hospital.generalBeds.total)}`}>
                    {hospital.generalBeds.available}/{hospital.generalBeds.total}
                  </p>
                  <Progress
                    value={(hospital.generalBeds.available / hospital.generalBeds.total) * 100}
                    className="mt-2 h-2"
                  />
                </div>

                {/* ICU Beds */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-gray-600" />
                      <span>ICU Beds</span>
                    </div>
                    <Badge variant={hospital.icuBeds.available > 0 ? "default" : "destructive"}>
                      {getAvailabilityStatus(hospital.icuBeds.available, hospital.icuBeds.total)}
                    </Badge>
                  </div>
                  <p className={`text-2xl ${getAvailabilityColor(hospital.icuBeds.available, hospital.icuBeds.total)}`}>
                    {hospital.icuBeds.available}/{hospital.icuBeds.total}
                  </p>
                  <Progress
                    value={(hospital.icuBeds.available / hospital.icuBeds.total) * 100}
                    className="mt-2 h-2"
                  />
                </div>

                {/* Ventilators */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-gray-600" />
                      <span>Ventilators</span>
                    </div>
                    <Badge variant={hospital.ventilators.available > 0 ? "default" : "destructive"}>
                      {getAvailabilityStatus(hospital.ventilators.available, hospital.ventilators.total)}
                    </Badge>
                  </div>
                  <p className={`text-2xl ${getAvailabilityColor(hospital.ventilators.available, hospital.ventilators.total)}`}>
                    {hospital.ventilators.available}/{hospital.ventilators.total}
                  </p>
                  <Progress
                    value={(hospital.ventilators.available / hospital.ventilators.total) * 100}
                    className="mt-2 h-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Emergency Wait</p>
                    <p>{hospital.emergencyWait}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hospital.oxygenAvailable ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Oxygen</p>
                    <p>{hospital.oxygenAvailable ? "Available" : "Not Available"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hospital.bloodBank ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Blood Bank</p>
                    <p>{hospital.bloodBank ? "Available" : "Not Available"}</p>
                  </div>
                </div>
                <div>
                  <Button className="w-full">Book Bed</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Department-wise Availability</CardTitle>
          <CardDescription>Current status of different departments across hospitals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentAvailability.map((dept, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4>{dept.name}</h4>
                  <Badge variant={dept.available ? "default" : "secondary"}>
                    {dept.available ? "Available" : "Full"}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{dept.doctors} doctors available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Wait time: {dept.waitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
