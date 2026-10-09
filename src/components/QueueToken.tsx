import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Clock, MapPin, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";

const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    location: "Downtown, 2.5 km away",
    departments: ["Emergency", "Cardiology", "Orthopedics", "General Medicine"],
    currentQueue: 12,
    avgWaitTime: "25 min"
  },
  {
    id: 2,
    name: "Community Health Center",
    location: "North District, 3.8 km away",
    departments: ["General Medicine", "Pediatrics", "Gynecology"],
    currentQueue: 8,
    avgWaitTime: "15 min"
  },
  {
    id: 3,
    name: "Rural Medical Clinic",
    location: "Village Road, 5.2 km away",
    departments: ["General Medicine", "Emergency"],
    currentQueue: 5,
    avgWaitTime: "10 min"
  }
];

export default function QueueToken() {
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");
  const [queuePosition, setQueuePosition] = useState(0);

  const generateToken = () => {
    if (selectedHospital && selectedDepartment) {
      const token = `${selectedDepartment.substring(0, 1)}${Math.floor(Math.random() * 900 + 100)}`;
      setTokenNumber(token);
      setQueuePosition(selectedHospital.currentQueue + 1);
      setTokenGenerated(true);
    }
  };

  const resetToken = () => {
    setTokenGenerated(false);
    setTokenNumber("");
    setSelectedHospital(null);
    setSelectedDepartment("");
    setQueuePosition(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Digital Queue Token</h1>
        <p className="text-gray-600 mt-2">Skip the waiting room - Get your digital queue token now</p>
      </div>

      {!tokenGenerated ? (
        <>
          {/* Hospital Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Hospital & Department</CardTitle>
              <CardDescription>Choose your preferred hospital and department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Hospital</Label>
                <Select onValueChange={(value) => {
                  const hospital = hospitals.find(h => h.id === parseInt(value));
                  setSelectedHospital(hospital || null);
                  setSelectedDepartment("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id.toString()}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedHospital && (
                <div className="space-y-2">
                  <Label>Select Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedHospital.departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedHospital && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{selectedHospital.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>Current Queue: {selectedHospital.currentQueue} people</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Avg. Wait Time: {selectedHospital.avgWaitTime}</span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full"
                onClick={generateToken}
                disabled={!selectedHospital || !selectedDepartment}
              >
                Generate Token
              </Button>
            </CardContent>
          </Card>

          {/* Available Hospitals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedHospital(hospital)}>
                <CardHeader>
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {hospital.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Queue Length</span>
                    <Badge variant={hospital.currentQueue < 10 ? "default" : "secondary"}>
                      {hospital.currentQueue} people
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Wait Time</span>
                    <span>{hospital.avgWaitTime}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-2">Departments</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.departments.slice(0, 2).map((dept, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{dept}</Badge>
                      ))}
                      {hospital.departments.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{hospital.departments.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Token Display */
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-green-500">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Token Generated Successfully!</CardTitle>
              <CardDescription>Please arrive at the hospital 10 minutes before your turn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Number */}
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Your Token Number</p>
                <p className="text-6xl tracking-wider text-blue-600">{tokenNumber}</p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Hospital</span>
                  <span>{selectedHospital?.name}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Department</span>
                  <span>{selectedDepartment}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Queue Position</span>
                  <Badge>{queuePosition} in line</Badge>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Estimated Wait</span>
                  <span>{Math.ceil(queuePosition * 5)} minutes</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Queue Progress</span>
                  <span>3 of {queuePosition} served</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>

              {/* Alert */}
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-yellow-900">Please keep this token safe. You'll need to show it at the hospital reception.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Download Token
                </Button>
                <Button className="flex-1" onClick={resetToken}>
                  Generate New Token
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
