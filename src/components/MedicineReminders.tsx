import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Pill, Plus, Clock, Bell, Trash2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { toast } from "sonner@2.0.3";

interface Reminder {
  id: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  withFood: boolean;
  active: boolean;
  notes?: string;
}

const initialReminders: Reminder[] = [
  {
    id: 1,
    medicineName: "Aspirin",
    dosage: "100mg",
    frequency: "Once Daily",
    times: ["09:00 AM"],
    startDate: "2025-11-01",
    endDate: "2025-12-01",
    withFood: false,
    active: true,
    notes: "Take with water"
  },
  {
    id: 2,
    medicineName: "Vitamin D",
    dosage: "1000 IU",
    frequency: "Once Daily",
    times: ["01:00 PM"],
    startDate: "2025-11-01",
    endDate: "2026-02-01",
    withFood: true,
    active: true
  },
  {
    id: 3,
    medicineName: "Metformin",
    dosage: "500mg",
    frequency: "Twice Daily",
    times: ["08:00 AM", "08:00 PM"],
    startDate: "2025-10-15",
    endDate: "2025-12-15",
    withFood: true,
    active: true,
    notes: "Take after meals"
  },
  {
    id: 4,
    medicineName: "Omega-3",
    dosage: "1000mg",
    frequency: "Once Daily",
    times: ["07:00 PM"],
    startDate: "2025-11-01",
    endDate: "2026-01-01",
    withFood: false,
    active: false
  }
];

export default function MedicineReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medicineName: "",
    dosage: "",
    frequency: "Once Daily",
    times: ["09:00 AM"],
    startDate: "",
    endDate: "",
    withFood: false,
    notes: ""
  });

  const handleAddReminder = () => {
    if (newReminder.medicineName && newReminder.dosage && newReminder.startDate) {
      const reminder: Reminder = {
        id: reminders.length + 1,
        ...newReminder,
        active: true
      };
      setReminders([reminder, ...reminders]);
      setNewReminder({
        medicineName: "",
        dosage: "",
        frequency: "Once Daily",
        times: ["09:00 AM"],
        startDate: "",
        endDate: "",
        withFood: false,
        notes: ""
      });
      setIsAddingReminder(false);
      toast.success("Reminder added successfully!");
    }
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success("Reminder deleted");
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const markAsTaken = (id: number, time: string) => {
    toast.success(`Marked as taken: ${reminders.find(r => r.id === id)?.medicineName} at ${time}`);
  };

  const activeReminders = reminders.filter(r => r.active);
  const upcomingToday = reminders.filter(r => r.active).flatMap(r => 
    r.times.map(time => ({ ...r, time }))
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Medicine Reminders</h1>
          <p className="text-gray-600 mt-2">Never miss your medication schedule</p>
        </div>
        <Dialog open={isAddingReminder} onOpenChange={setIsAddingReminder}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Medicine Reminder</DialogTitle>
              <DialogDescription>Set up a reminder for your medication</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Medicine Name</Label>
                <Input 
                  placeholder="e.g., Aspirin"
                  value={newReminder.medicineName}
                  onChange={(e) => setNewReminder({...newReminder, medicineName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Dosage</Label>
                <Input 
                  placeholder="e.g., 100mg"
                  value={newReminder.dosage}
                  onChange={(e) => setNewReminder({...newReminder, dosage: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select 
                  value={newReminder.frequency} 
                  onValueChange={(value) => {
                    let times = ["09:00 AM"];
                    if (value === "Twice Daily") times = ["09:00 AM", "09:00 PM"];
                    if (value === "Three Times Daily") times = ["09:00 AM", "02:00 PM", "09:00 PM"];
                    if (value === "Four Times Daily") times = ["08:00 AM", "12:00 PM", "04:00 PM", "08:00 PM"];
                    setNewReminder({...newReminder, frequency: value, times});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once Daily">Once Daily</SelectItem>
                    <SelectItem value="Twice Daily">Twice Daily</SelectItem>
                    <SelectItem value="Three Times Daily">Three Times Daily</SelectItem>
                    <SelectItem value="Four Times Daily">Four Times Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input 
                    type="date"
                    value={newReminder.startDate}
                    onChange={(e) => setNewReminder({...newReminder, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input 
                    type="date"
                    value={newReminder.endDate}
                    onChange={(e) => setNewReminder({...newReminder, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Take with food</Label>
                  <p className="text-sm text-gray-500">Should this be taken with meals?</p>
                </div>
                <Switch 
                  checked={newReminder.withFood}
                  onCheckedChange={(checked) => setNewReminder({...newReminder, withFood: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label>Times</Label>
                <div className="space-y-2">
                  {newReminder.times.map((time, idx) => (
                    <Input 
                      key={idx}
                      type="time"
                      value={time}
                      onChange={(e) => {
                        const newTimes = [...newReminder.times];
                        newTimes[idx] = e.target.value;
                        setNewReminder({...newReminder, times: newTimes});
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Input 
                  placeholder="e.g., Take with water"
                  value={newReminder.notes}
                  onChange={(e) => setNewReminder({...newReminder, notes: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsAddingReminder(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddReminder}>
                  Add Reminder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Reminders</p>
                <p className="text-2xl mt-1">{activeReminders.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Doses</p>
                <p className="text-2xl mt-1">{upcomingToday.length}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Medications</p>
                <p className="text-2xl mt-1">{reminders.length}</p>
              </div>
              <Pill className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Upcoming medication times for today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingToday.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No medications scheduled for today</p>
          ) : (
            upcomingToday.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Pill className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p>{item.medicineName}</p>
                    <p className="text-sm text-gray-500">{item.dosage} • {item.withFood ? "With food" : "Without food"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{item.time}</Badge>
                  <Button size="sm" variant="outline" onClick={() => markAsTaken(item.id, item.time)}>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Mark Taken
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* All Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>All Reminders</CardTitle>
          <CardDescription>Manage your medication reminders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg">{reminder.medicineName}</h3>
                    <Badge variant={reminder.active ? "default" : "secondary"}>
                      {reminder.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{reminder.dosage} • {reminder.frequency}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={reminder.active}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteReminder(reminder.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Times</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {reminder.times.map((time, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{time}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="mt-1">{new Date(reminder.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="mt-1">{new Date(reminder.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">With Food</p>
                  <p className="mt-1">{reminder.withFood ? "Yes" : "No"}</p>
                </div>
              </div>

              {reminder.notes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-sm mt-1">{reminder.notes}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
