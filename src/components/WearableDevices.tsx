import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Watch, Activity, Heart, Footprints, Droplet, Moon, TrendingUp, TrendingDown, Zap, Link, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface WearableDevice {
  id: number;
  name: string;
  type: string;
  connected: boolean;
  lastSync: string;
  battery: number;
}

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  icon: any;
  trend: "up" | "down" | "stable";
  status: "good" | "warning" | "critical";
  color: string;
}

const devices: WearableDevice[] = [
  {
    id: 1,
    name: "Apple Watch Series 9",
    type: "Smartwatch",
    connected: true,
    lastSync: "2 mins ago",
    battery: 85
  },
  {
    id: 2,
    name: "Fitbit Charge 6",
    type: "Fitness Band",
    connected: false,
    lastSync: "2 hours ago",
    battery: 65
  },
  {
    id: 3,
    name: "Samsung Galaxy Watch 6",
    type: "Smartwatch",
    connected: false,
    lastSync: "Never",
    battery: 0
  }
];

const healthMetrics: HealthMetric[] = [
  {
    name: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: Heart,
    trend: "stable",
    status: "good",
    color: "text-red-600"
  },
  {
    name: "Steps Today",
    value: "8,547",
    unit: "steps",
    icon: Footprints,
    trend: "up",
    status: "good",
    color: "text-green-600"
  },
  {
    name: "Calories Burned",
    value: "1,234",
    unit: "kcal",
    icon: Zap,
    trend: "up",
    status: "good",
    color: "text-orange-600"
  },
  {
    name: "Sleep Duration",
    value: "7.5",
    unit: "hours",
    icon: Moon,
    trend: "stable",
    status: "good",
    color: "text-purple-600"
  },
  {
    name: "Blood Oxygen",
    value: "98",
    unit: "%",
    icon: Droplet,
    trend: "stable",
    status: "good",
    color: "text-blue-600"
  },
  {
    name: "Active Minutes",
    value: "45",
    unit: "mins",
    icon: Activity,
    trend: "up",
    status: "good",
    color: "text-cyan-600"
  }
];

const weeklyData = [
  { day: "Mon", steps: 7500, heartRate: 70, sleep: 7 },
  { day: "Tue", steps: 9200, heartRate: 72, sleep: 6.5 },
  { day: "Wed", steps: 8100, heartRate: 71, sleep: 8 },
  { day: "Thu", steps: 10500, heartRate: 73, sleep: 7.5 },
  { day: "Fri", steps: 8547, heartRate: 72, sleep: 7.5 },
  { day: "Sat", steps: 0, heartRate: 0, sleep: 0 },
  { day: "Sun", steps: 0, heartRate: 0, sleep: 0 }
];

export default function WearableDevices() {
  const [connectedDevices, setConnectedDevices] = useState(devices);

  const handleConnectDevice = (id: number) => {
    setConnectedDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, connected: true, lastSync: "Just now" }
          : device
      )
    );
    toast.success("Device connected successfully!");
  };

  const handleDisconnectDevice = (id: number) => {
    setConnectedDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, connected: false }
          : device
      )
    );
    toast.success("Device disconnected");
  };

  const handleSyncData = () => {
    toast.success("Syncing data from all connected devices...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Wearable Devices</h1>
          <p className="text-gray-600 mt-2">Sync health data from your smartwatch and fitness trackers</p>
        </div>
        <Button onClick={handleSyncData}>
          <Activity className="h-4 w-4 mr-2" />
          Sync All Devices
        </Button>
      </div>

      {/* Connected Devices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {connectedDevices.map((device) => (
          <Card key={device.id} className={device.connected ? "border-green-500 border-2" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Watch className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{device.name}</CardTitle>
                    <CardDescription>{device.type}</CardDescription>
                  </div>
                </div>
                {device.connected && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Battery</span>
                  <span>{device.battery}%</span>
                </div>
                <Progress value={device.battery} className="h-2" />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Sync</span>
                <span>{device.lastSync}</span>
              </div>

              {device.connected ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleDisconnectDevice(device.id)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleConnectDevice(device.id)}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Connect Device
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Health Metrics</CardTitle>
          <CardDescription>Real-time data from your connected devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {healthMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                    {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                  </div>
                  <p className="text-sm text-gray-500">{metric.name}</p>
                  <p className="text-2xl mt-1">{metric.value}</p>
                  <p className="text-xs text-gray-400">{metric.unit}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="heartrate">Heart Rate</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Steps</CardTitle>
              <CardDescription>Your step count for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-around gap-2">
                {weeklyData.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-600 rounded-t"
                      style={{ height: `${(day.steps / 12000) * 100}%`, minHeight: day.steps > 0 ? '10%' : '0' }}
                    ></div>
                    <p className="text-sm mt-2">{day.day}</p>
                    <p className="text-xs text-gray-500">{day.steps > 0 ? day.steps.toLocaleString() : '-'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heartrate">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Heart Rate</CardTitle>
              <CardDescription>Average heart rate for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-around gap-2">
                {weeklyData.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-red-600 rounded-t"
                      style={{ height: `${(day.heartRate / 100) * 100}%`, minHeight: day.heartRate > 0 ? '10%' : '0' }}
                    ></div>
                    <p className="text-sm mt-2">{day.day}</p>
                    <p className="text-xs text-gray-500">{day.heartRate > 0 ? `${day.heartRate} bpm` : '-'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Sleep</CardTitle>
              <CardDescription>Sleep duration for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-around gap-2">
                {weeklyData.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-purple-600 rounded-t"
                      style={{ height: `${(day.sleep / 10) * 100}%`, minHeight: day.sleep > 0 ? '10%' : '0' }}
                    ></div>
                    <p className="text-sm mt-2">{day.day}</p>
                    <p className="text-xs text-gray-500">{day.sleep > 0 ? `${day.sleep}h` : '-'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Health Insights</CardTitle>
          <CardDescription>Personalized recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-900 mb-1">Great Activity Level!</h4>
                <p className="text-sm text-gray-700">You've exceeded your daily step goal for 4 out of 5 days this week. Keep up the excellent work!</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-1">Heart Rate Trend</h4>
                <p className="text-sm text-gray-700">Your resting heart rate has been stable at 72 bpm. This is within the healthy range for your age group.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <div className="flex items-start gap-3">
              <Moon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-yellow-900 mb-1">Sleep Recommendation</h4>
                <p className="text-sm text-gray-700">You're averaging 7.5 hours of sleep, which is good. Try maintaining a consistent sleep schedule for better rest quality.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Banner */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1665860455418-017fa50d29bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwZml0bmVzcyUyMHRyYWNrZXJ8ZW58MXx8fHwxNzYyNTg4NTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Wearable Devices"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
          <div className="p-8 text-white">
            <h2 className="text-2xl mb-2">Connect Your Devices</h2>
            <p className="mb-4">Sync data from Apple Watch, Fitbit, Samsung Galaxy Watch, and more</p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Add Device
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
