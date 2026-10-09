import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, FileText, Pill, Users, Activity } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Section }  from '../App';

interface DashboardProps {
  onNavigate: (section: Section) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const upcomingAppointments = [
    { doctor: "Dr. Talha Yunus", specialty: "Cardiologist", time: "10:00 AM", date: "Nov 9, 2025" },
    { doctor: "Dr. Talha Anjum", specialty: "General Physician", time: "2:30 PM", date: "Nov 12, 2025" },
  ];

  const todayReminders = [
    { medicine: "Aspirin", dosage: "100mg", time: "9:00 AM" },
    { medicine: "Vitamin D", dosage: "1000 IU", time: "1:00 PM" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="mb-2">Welcome to Sehat Link</h1>
        <p className="opacity-90">Your health, our priority. Access quality healthcare anytime, anywhere.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl mt-1">2</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Queue Token</p>
                <p className="text-2xl mt-1">#A12</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Records</p>
                <p className="text-2xl mt-1">8</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reminders</p>
                <p className="text-2xl mt-1">4</p>
              </div>
              <Pill className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access our key features with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto flex-col gap-2 p-6"
              onClick={() => onNavigate('consultations')}
            >
              <Users className="h-8 w-8 text-blue-600" />
              <span>Find Doctor</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col gap-2 p-6"
              onClick={() => onNavigate('queue')}
            >
              <Clock className="h-8 w-8 text-green-600" />
              <span>Get Token</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col gap-2 p-6"
              onClick={() => onNavigate('records')}
            >
              <FileText className="h-8 w-8 text-purple-600" />
              <span>My Records</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col gap-2 p-6"
              onClick={() => onNavigate('reminders')}
            >
              <Pill className="h-8 w-8 text-orange-600" />
              <span>Reminders</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled consultations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingAppointments.map((apt, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p>{apt.doctor}</p>
                  <p className="text-sm text-gray-500">{apt.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{apt.date}</p>
                <Badge variant="secondary" className="mt-1">{apt.time}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Today's Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Medicine Reminders</CardTitle>
          <CardDescription>Don't forget to take your medications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayReminders.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Pill className="h-6 w-6 text-orange-600" />
                <div>
                  <p>{reminder.medicine}</p>
                  <p className="text-sm text-gray-500">{reminder.dosage}</p>
                </div>
              </div>
              <Badge>{reminder.time}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
