import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Droplet, MapPin, Phone, Clock, Search, UserPlus, Heart, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface Donor {
  id: number;
  name: string;
  bloodType: string;
  location: string;
  distance: string;
  phone: string;
  lastDonation: string;
  availableToday: boolean;
  totalDonations: number;
}

const donors: Donor[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    bloodType: "O+",
    location: "Downtown, Mumbai",
    distance: "2.3 km",
    phone: "+91 98765 43210",
    lastDonation: "2 months ago",
    availableToday: true,
    totalDonations: 12
  },
  {
    id: 2,
    name: "Priya Patel",
    bloodType: "A+",
    location: "Andheri West",
    distance: "3.8 km",
    phone: "+91 98765 43211",
    lastDonation: "3 months ago",
    availableToday: true,
    totalDonations: 8
  },
  {
    id: 3,
    name: "Amit Kumar",
    bloodType: "B+",
    location: "Bandra East",
    distance: "4.5 km",
    phone: "+91 98765 43212",
    lastDonation: "4 months ago",
    availableToday: false,
    totalDonations: 15
  },
  {
    id: 4,
    name: "Sneha Reddy",
    bloodType: "AB+",
    location: "Powai",
    distance: "5.2 km",
    phone: "+91 98765 43213",
    lastDonation: "1 month ago",
    availableToday: true,
    totalDonations: 6
  }
];

const bloodDrives = [
  {
    id: 1,
    name: "City Hospital Blood Drive",
    date: "Nov 12, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "City General Hospital",
    slotsAvailable: 25
  },
  {
    id: 2,
    name: "Community Blood Donation Camp",
    date: "Nov 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Community Center",
    slotsAvailable: 40
  }
];

export default function BloodDonorNetwork() {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [registering, setRegistering] = useState(false);
  const [donorData, setDonorData] = useState({
    name: "",
    bloodType: "",
    phone: "",
    location: "",
    availability: true
  });

  const filteredDonors = selectedBloodType
    ? donors.filter(d => d.bloodType === selectedBloodType)
    : donors;

  const handleRegister = () => {
    if (donorData.name && donorData.bloodType && donorData.phone) {
      toast.success("Successfully registered as a blood donor!");
      setRegistering(false);
      setDonorData({ name: "", bloodType: "", phone: "", location: "", availability: true });
    }
  };

  const handleContactDonor = (donor: Donor) => {
    toast.success(`Contact request sent to ${donor.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Blood Donor Network</h1>
          <p className="text-gray-600 mt-2">Connect with blood donors and save lives</p>
        </div>
        <Dialog open={registering} onOpenChange={setRegistering}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Become a Donor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register as Blood Donor</DialogTitle>
              <DialogDescription>Join our network and help save lives</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="Enter your name"
                  value={donorData.name}
                  onChange={(e) => setDonorData({...donorData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select value={donorData.bloodType} onValueChange={(value) => setDonorData({...donorData, bloodType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+91 XXXXX XXXXX"
                  value={donorData.phone}
                  onChange={(e) => setDonorData({...donorData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="City, Area"
                  value={donorData.location}
                  onChange={(e) => setDonorData({...donorData, location: e.target.value})}
                />
              </div>
              <Button className="w-full" onClick={handleRegister}>
                Register as Donor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Donors</p>
                <p className="text-2xl mt-1">1,234</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lives Saved</p>
                <p className="text-2xl mt-1">3,456</p>
              </div>
              <Droplet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Requests</p>
                <p className="text-2xl mt-1">28</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl mt-1">145</p>
              </div>
              <Droplet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="find" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find">Find Donors</TabsTrigger>
          <TabsTrigger value="requests">Urgent Requests</TabsTrigger>
          <TabsTrigger value="drives">Blood Drives</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-4">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search Blood Donors</CardTitle>
              <CardDescription>Find donors by blood type and location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Blood Type</Label>
                  <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All blood types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All blood types</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Enter location" className="pl-10" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDonors.map((donor) => (
              <Card key={donor.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3>{donor.name}</h3>
                        <p className="text-sm text-gray-500">{donor.bloodType}</p>
                      </div>
                    </div>
                    <Badge variant={donor.availableToday ? "default" : "secondary"}>
                      {donor.availableToday ? "Available" : "Not Available"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{donor.location} • {donor.distance} away</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Last donation: {donor.lastDonation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="h-4 w-4" />
                      <span>Total donations: {donor.totalDonations}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" onClick={() => handleContactDonor(donor)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Donor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Urgent Blood Requests</CardTitle>
              <CardDescription>Help save lives by responding to urgent requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: "O-", hospital: "City General Hospital", urgency: "Critical", time: "2 hours ago" },
                { type: "AB+", hospital: "Community Health Center", urgency: "Urgent", time: "4 hours ago" },
                { type: "B-", hospital: "Rural Medical Clinic", urgency: "Normal", time: "6 hours ago" }
              ].map((request, idx) => (
                <div key={idx} className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <p className="text-red-600">{request.type}</p>
                    </div>
                    <div>
                      <p>{request.hospital}</p>
                      <p className="text-sm text-gray-500">{request.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={request.urgency === "Critical" ? "destructive" : request.urgency === "Urgent" ? "default" : "secondary"}>
                      {request.urgency}
                    </Badge>
                    <Button>Respond</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drives" className="space-y-4">
          {bloodDrives.map((drive) => (
            <Card key={drive.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{drive.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {drive.date} • {drive.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {drive.location}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge>{drive.slotsAvailable} slots available</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button>Register for Drive</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
