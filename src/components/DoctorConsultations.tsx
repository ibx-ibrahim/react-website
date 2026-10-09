import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Search, Star, Video, MessageSquare, Calendar, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const doctors = [
  {
    id: 1,
    name: "Dr. Faris Shafi",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    reviews: 234,
    fee: 500,
    available: "Today",
    languages: ["English", "Hindi"],
    image: "./public/unnamed (4).jpg"
  },
  {
    id: 2,
    name: "Dr. Talha Yunus",
    specialty: "General Physician",
    experience: "12 years",
    rating: 4.9,
    reviews: 456,
    fee: 300,
    available: "Today",
    languages: ["English", "Tamil"],
    image: "./public/unnamed.jpg"
  },
  {
    id: 3,
    name: "Dr. Talha Anjum",
    specialty: "Pediatrician",
    experience: "10 years",
    rating: 4.7,
    reviews: 189,
    fee: 400,
    available: "Tomorrow",
    languages: ["English", "Hindi", "Marathi"],
    image: "./public/unnamed (5).jpg"
  },
  {
    id: 4,
    name: "Dr. JJ47",
    specialty: "Dermatologist",
    experience: "8 years",
    rating: 4.6,
    reviews: 145,
    fee: 450,
    available: "Today",
    languages: ["English", "Hindi", "Bengali"],
    image: "./public/unnamed (2).jpg"
  },
  {
    id: 5,
    name: "Dr. Jokhay",
    specialty: "Gynecologist",
    experience: "18 years",
    rating: 4.9,
    reviews: 312,
    fee: 600,
    available: "Today",
    languages: ["English", "Hindi", "Gujarati"],
    image: "./public/unnamed (1).jpg"
  },
  {
    id: 6,
    name: "Dr. Nabeel Akbar",
    specialty: "Orthopedic",
    experience: "14 years",
    rating: 4.7,
    reviews: 267,
    fee: 550,
    available: "Tomorrow",
    languages: ["English", "Hindi"],
    image: "./public/unnamed (3).jpg"
  },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

export default function DoctorConsultations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingDoctor, setBookingDoctor] = useState<typeof doctors[0] | null>(null);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = () => {
    if (bookingDoctor && selectedDate && selectedTime) {
      alert(`Appointment booked with ${bookingDoctor.name} on ${format(selectedDate, "PPP")} at ${selectedTime}`);
      setBookingDoctor(null);
      setSelectedDate(undefined);
      setSelectedTime("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Find a Doctor</h1>
        <p className="text-gray-600 mt-2">Connect with verified doctors online or schedule an appointment</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search by doctor name or specialty..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </div>
                <Badge variant={doctor.available === "Today" ? "default" : "secondary"}>
                  {doctor.available}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-gray-500">({doctor.reviews})</span>
                </div>
                <div className="text-gray-600">{doctor.experience} exp</div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {doctor.languages.map((lang, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{lang}</Badge>
                ))}
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="text-xl text-blue-600">₹{doctor.fee}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setBookingDoctor(doctor)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                      Schedule a consultation with {doctor.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start mt-2">
                            <Calendar className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Select Time Slot</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="text-sm"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
