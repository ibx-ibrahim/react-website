import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FileText, Download, Upload, Plus, Calendar, User, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface HealthRecord {
  id: number;
  type: string;
  title: string;
  date: string;
  doctor: string;
  hospital: string;
  description: string;
  files?: string[];
}

const initialRecords: HealthRecord[] = [
  {
    id: 1,
    type: "Prescription",
    title: "Blood Pressure Medication",
    date: "Nov 5, 2025",
    doctor: "Dr. Sarah Johnson",
    hospital: "City General Hospital",
    description: "Prescribed medication for hypertension management",
    files: ["prescription_nov5.pdf"]
  },
  {
    id: 2,
    type: "Lab Report",
    title: "Complete Blood Count",
    date: "Oct 28, 2025",
    doctor: "Dr. Michael Chen",
    hospital: "Community Health Center",
    description: "Routine blood work - All values within normal range",
    files: ["cbc_report.pdf"]
  },
  {
    id: 3,
    type: "Diagnosis",
    title: "Annual Health Checkup",
    date: "Oct 15, 2025",
    doctor: "Dr. Priya Sharma",
    hospital: "City General Hospital",
    description: "Complete physical examination and health assessment",
    files: ["checkup_report.pdf"]
  },
  {
    id: 4,
    type: "Vaccination",
    title: "Flu Vaccine",
    date: "Sep 20, 2025",
    doctor: "Dr. Rajesh Kumar",
    hospital: "Community Health Center",
    description: "Annual influenza vaccination administered"
  },
];

export default function HealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>(initialRecords);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "",
    title: "",
    date: "",
    doctor: "",
    hospital: "",
    description: ""
  });

  const handleAddRecord = () => {
    if (newRecord.type && newRecord.title && newRecord.date) {
      const record: HealthRecord = {
        id: records.length + 1,
        ...newRecord
      };
      setRecords([record, ...records]);
      setNewRecord({ type: "", title: "", date: "", doctor: "", hospital: "", description: "" });
      setIsAddingRecord(false);
    }
  };

  const recordsByType = (type: string) => {
    if (type === "all") return records;
    return records.filter(record => record.type === type);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Health Records</h1>
          <p className="text-gray-600 mt-2">Manage all your medical records in one place</p>
        </div>
        <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Health Record</DialogTitle>
              <DialogDescription>Upload or enter details of your medical record</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Record Type</Label>
                <Select value={newRecord.type} onValueChange={(value) => setNewRecord({...newRecord, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                    <SelectItem value="Lab Report">Lab Report</SelectItem>
                    <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                    <SelectItem value="Vaccination">Vaccination</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  placeholder="e.g., Blood Test Results"
                  value={newRecord.title}
                  onChange={(e) => setNewRecord({...newRecord, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Doctor Name</Label>
                <Input 
                  placeholder="e.g., Dr. John Doe"
                  value={newRecord.doctor}
                  onChange={(e) => setNewRecord({...newRecord, doctor: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Hospital/Clinic</Label>
                <Input 
                  placeholder="e.g., City Hospital"
                  value={newRecord.hospital}
                  onChange={(e) => setNewRecord({...newRecord, hospital: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Add any additional notes..."
                  value={newRecord.description}
                  onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Files (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsAddingRecord(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddRecord}>
                  Add Record
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="text-2xl mt-1">{records.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Prescriptions</p>
                <p className="text-2xl mt-1">{recordsByType("Prescription").length}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lab Reports</p>
                <p className="text-2xl mt-1">{recordsByType("Lab Report").length}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vaccinations</p>
                <p className="text-2xl mt-1">{recordsByType("Vaccination").length}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Records List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="Prescription">Prescriptions</TabsTrigger>
          <TabsTrigger value="Lab Report">Lab Reports</TabsTrigger>
          <TabsTrigger value="Vaccination">Vaccinations</TabsTrigger>
        </TabsList>

        {["all", "Prescription", "Lab Report", "Vaccination"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {recordsByType(type).length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No records found</p>
                </CardContent>
              </Card>
            ) : (
              recordsByType(type).map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{record.type}</Badge>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="mt-2">{record.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Doctor</p>
                          <p>{record.doctor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Hospital</p>
                          <p>{record.hospital}</p>
                        </div>
                      </div>
                    </div>
                    {record.files && record.files.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-500 mb-2">Attached Files</p>
                        <div className="flex flex-wrap gap-2">
                          {record.files.map((file, idx) => (
                            <Badge key={idx} variant="secondary" className="cursor-pointer">
                              <FileText className="h-3 w-3 mr-1" />
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
