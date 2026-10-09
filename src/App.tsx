import { useState } from "react";
import { 
  Home, Users, Clock, FileText, Pill, Menu, Heart, 
  Bot, Droplet, Ambulance, MapPin, Hospital, Watch, 
  Shield, Brain, Mic 
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import DoctorConsultations from "./components/DoctorConsultations";
import QueueToken from "./components/QueueToken";
import HealthRecords from "./components/HealthRecords";
import MedicineReminders from "./components/MedicineReminders";
import AIAssistant from "./components/AIAssistant";
import BloodDonorNetwork from "./components/BloodDonorNetwork";
import EmergencyServices from "./components/EmergencyServices";
import NearbyServices from "./components/NearbyServices";
import HospitalAvailability from "./components/HospitalAvailability";
import WearableDevices from "./components/WearableDevices";
import BlockchainRecords from "./components/BlockchainRecords";
import VirtualPsychologist from "./components/VirtualPsychologist";
import VoiceAssistant from "./components/VoiceAssistant";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./components/ui/sheet";
import { Toaster } from "./components/ui/sonner";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";

export type Section = 
  | 'dashboard' 
  | 'consultations' 
  | 'queue' 
  | 'records' 
  | 'reminders' 
  | 'ai-assistant'
  | 'blood-donor'
  | 'emergency'
  | 'nearby-services'
  | 'hospital-availability'
  | 'wearable'
  | 'blockchain'
  | 'psychologist'
  | 'voice-assistant';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard' as Section, name: 'Dashboard', icon: Home, category: 'main' },
    { id: 'consultations' as Section, name: 'Find Doctor', icon: Users, category: 'main' },
    { id: 'queue' as Section, name: 'Queue Token', icon: Clock, category: 'main' },
    { id: 'records' as Section, name: 'Health Records', icon: FileText, category: 'main' },
    { id: 'reminders' as Section, name: 'Reminders', icon: Pill, category: 'main' },
    { id: 'ai-assistant' as Section, name: 'AI Assistant', icon: Bot, category: 'ai' },
    { id: 'psychologist' as Section, name: 'Virtual Psychologist', icon: Brain, category: 'ai' },
    { id: 'emergency' as Section, name: 'Emergency', icon: Ambulance, category: 'services' },
    { id: 'hospital-availability' as Section, name: 'Hospital Availability', icon: Hospital, category: 'services' },
    { id: 'nearby-services' as Section, name: 'Nearby Services', icon: MapPin, category: 'services' },
    { id: 'blood-donor' as Section, name: 'Blood Donors', icon: Droplet, category: 'services' },
    { id: 'wearable' as Section, name: 'Wearable Devices', icon: Watch, category: 'advanced' },
    { id: 'blockchain' as Section, name: 'Blockchain Records', icon: Shield, category: 'advanced' },
    { id: 'voice-assistant' as Section, name: 'Voice Assistant', icon: Mic, category: 'advanced' },
  ];

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'consultations':
        return <DoctorConsultations />;
      case 'queue':
        return <QueueToken />;
      case 'records':
        return <HealthRecords />;
      case 'reminders':
        return <MedicineReminders />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'blood-donor':
        return <BloodDonorNetwork />;
      case 'emergency':
        return <EmergencyServices />;
      case 'nearby-services':
        return <NearbyServices />;
      case 'hospital-availability':
        return <HospitalAvailability />;
      case 'wearable':
        return <WearableDevices />;
      case 'blockchain':
        return <BlockchainRecords />;
      case 'psychologist':
        return <VirtualPsychologist />;
      case 'voice-assistant':
        return <VoiceAssistant />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const Sidebar = () => (
    <div className="h-full bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl">Sehat Link</h2>
            <p className="text-xs text-gray-500">Virtual Healthcare</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <nav className="space-y-1">
          {/* Main Features */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 px-4 mb-2">MAIN FEATURES</p>
            {navigation.filter(item => item.category === 'main').map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <Separator />

          {/* AI Features */}
          <div className="my-4">
            <p className="text-xs text-gray-500 px-4 mb-2">AI POWERED</p>
            {navigation.filter(item => item.category === 'ai').map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <Separator />

          {/* Services */}
          <div className="my-4">
            <p className="text-xs text-gray-500 px-4 mb-2">SERVICES</p>
            {navigation.filter(item => item.category === 'services').map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <Separator />

          {/* Advanced Features */}
          <div className="my-4">
            <p className="text-xs text-gray-500 px-4 mb-2">ADVANCED</p>
            {navigation.filter(item => item.category === 'advanced').map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex-shrink-0">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm">Need help?</p>
          <p className="text-xs text-gray-600 mt-1">Contact support 24/7</p>
          <Button variant="outline" size="sm" className="w-full mt-3">
            Get Support
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span>Sehat Link</span>
        </div>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate through Sehat Link features
            </SheetDescription>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 mt-16 md:mt-0">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
