import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Mic, Volume2, Bell, Calendar, Pill, Utensils, Activity, CheckCircle, Settings } from "lucide-react";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

interface VoiceDevice {
  id: number;
  name: string;
  type: "alexa" | "google";
  connected: boolean;
  features: string[];
}

interface VoiceCommand {
  command: string;
  action: string;
  enabled: boolean;
}

const devices: VoiceDevice[] = [
  {
    id: 1,
    name: "Living Room Alexa",
    type: "alexa",
    connected: true,
    features: ["Medicine Reminders", "Diet Plans", "Health Tips"]
  },
  {
    id: 2,
    name: "Bedroom Google Home",
    type: "google",
    connected: false,
    features: ["Medicine Reminders", "Appointment Alerts", "Mood Tracking"]
  },
  {
    id: 3,
    name: "Kitchen Alexa Echo",
    type: "alexa",
    connected: false,
    features: ["Diet Plans", "Recipe Suggestions", "Calorie Tracking"]
  }
];

const voiceCommands: VoiceCommand[] = [
  { command: "Alexa, remind me to take my medicine", action: "Medicine Reminder", enabled: true },
  { command: "Hey Google, what's my health summary?", action: "Health Summary", enabled: true },
  { command: "Alexa, show my diet plan for today", action: "Diet Plan", enabled: true },
  { command: "Hey Google, track my mood", action: "Mood Tracker", enabled: true },
  { command: "Alexa, when is my next appointment?", action: "Appointment Info", enabled: true },
  { command: "Hey Google, start a breathing exercise", action: "Wellness Exercise", enabled: true }
];

export default function VoiceAssistant() {
  const [connectedDevices, setConnectedDevices] = useState(devices);
  const [commands, setCommands] = useState(voiceCommands);

  const handleConnectDevice = (id: number) => {
    setConnectedDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, connected: !device.connected }
          : device
      )
    );
    const device = connectedDevices.find(d => d.id === id);
    toast.success(device?.connected ? `${device.name} disconnected` : `${device?.name} connected successfully!`);
  };

  const toggleCommand = (index: number) => {
    setCommands(prev =>
      prev.map((cmd, idx) =>
        idx === index ? { ...cmd, enabled: !cmd.enabled } : cmd
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Voice Assistant Integration</h1>
        <p className="text-gray-600 mt-2">Control your health app with Alexa and Google Home</p>
      </div>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
          <CardDescription>Manage your voice-enabled devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectedDevices.map((device) => (
              <Card key={device.id} className={device.connected ? "border-green-500 border-2" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        device.type === 'alexa' ? 'bg-blue-100' : 'bg-red-100'
                      }`}>
                        <Volume2 className={`h-6 w-6 ${
                          device.type === 'alexa' ? 'text-blue-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p>{device.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{device.type}</p>
                      </div>
                    </div>
                    {device.connected && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-500">Features:</p>
                    {device.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1 mb-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={device.connected ? "outline" : "default"}
                    onClick={() => handleConnectDevice(device.id)}
                  >
                    {device.connected ? "Disconnect" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Pill className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Medicine Reminders</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get voice notifications on your devices for medication schedules
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="medicine-alerts">Voice Alerts</Label>
              <Switch id="medicine-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Diet Plans</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Ask your voice assistant for personalized diet recommendations
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="diet-voice">Voice Access</Label>
              <Switch id="diet-voice" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Health Tracking</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Track vitals and activities through voice commands
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="health-tracking">Voice Tracking</Label>
              <Switch id="health-tracking" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Available Voice Commands</CardTitle>
          <CardDescription>Enable or disable specific voice commands</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commands.map((cmd, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm">{cmd.command}</p>
                    <p className="text-xs text-gray-500">{cmd.action}</p>
                  </div>
                </div>
                <Switch
                  checked={cmd.enabled}
                  onCheckedChange={() => toggleCommand(idx)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
          <CardDescription>Customize your voice assistant experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <div>
                <p>Voice Notification Volume</p>
                <p className="text-sm text-gray-500">Adjust reminder volume level</p>
              </div>
            </div>
            <Badge>Medium</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p>Daily Health Briefing</p>
                <p className="text-sm text-gray-500">Morning health summary at 8:00 AM</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mic className="h-5 w-5 text-gray-400" />
              <div>
                <p>Wake Word Detection</p>
                <p className="text-sm text-gray-500">Respond to "Hey Sehat Link"</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-gray-400" />
              <div>
                <p>Privacy Mode</p>
                <p className="text-sm text-gray-500">Don't save voice recordings</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Example Interactions */}
      <Card>
        <CardHeader>
          <CardTitle>Example Interactions</CardTitle>
          <CardDescription>Try these voice commands with your devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Alexa</Badge>
                <p>Medicine Reminder</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">"Alexa, ask Sehat Link when to take my medicine"</p>
              <p className="text-xs text-gray-500 italic">Response: "You need to take Aspirin 100mg at 9:00 AM"</p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Google</Badge>
                <p>Diet Plan</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">"Hey Google, ask Sehat Link for my diet plan"</p>
              <p className="text-xs text-gray-500 italic">Response: "Your breakfast should include oatmeal with fruits..."</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Alexa</Badge>
                <p>Appointment</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">"Alexa, when is my next doctor appointment?"</p>
              <p className="text-xs text-gray-500 italic">Response: "You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM"</p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Google</Badge>
                <p>Health Summary</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">"Hey Google, give me my health summary"</p>
              <p className="text-xs text-gray-500 italic">Response: "You've walked 8,547 steps today and your heart rate is 72 bpm..."</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Guide */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Quick Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside">
            <li>Open the Alexa or Google Home app on your smartphone</li>
            <li>Go to Skills (Alexa) or Services (Google Home)</li>
            <li>Search for "Sehat Link Health"</li>
            <li>Click "Enable" and link your Sehat Link account</li>
            <li>Say "Alexa, ask Sehat Link to sync my data" to start</li>
          </ol>
          <Button className="w-full mt-4">View Detailed Setup Instructions</Button>
        </CardContent>
      </Card>
    </div>
  );
}
