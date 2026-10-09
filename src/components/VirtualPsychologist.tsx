import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Brain, Mic, MicOff, Video, VideoOff, MessageSquare, Heart, Smile, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface Message {
  id: number;
  sender: 'user' | 'therapist';
  text: string;
  timestamp: Date;
}

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

const therapistResponses: { [key: string]: string } = {
  anxiety: "I understand that you're feeling anxious. Anxiety is a natural response, but when it becomes overwhelming, it's important to address it. Let's explore some coping strategies together. Can you tell me more about what triggers your anxiety?",
  depression: "Thank you for sharing that with me. Depression can make everything feel heavy and difficult. Remember, you're not alone in this journey. It takes courage to seek help, and I'm here to support you. What has been the most challenging part for you recently?",
  stress: "Stress is something we all experience, and it sounds like you're dealing with a lot right now. Let's work on some stress management techniques. First, can you identify the main sources of your stress?",
  sleep: "Sleep issues can significantly impact your mental health and overall well-being. A good sleep routine is essential. Let's discuss your current sleep habits and work on creating a better sleep hygiene routine.",
  default: "I hear you, and your feelings are valid. It's important that you're taking the time to talk about this. Can you tell me more about what you're experiencing? I'm here to listen and support you."
};

const moodData: MoodEntry[] = [
  { date: "Mon", mood: 6, note: "Felt okay" },
  { date: "Tue", mood: 7, note: "Good day" },
  { date: "Wed", mood: 5, note: "Bit stressed" },
  { date: "Thu", mood: 8, note: "Very positive" },
  { date: "Fri", mood: 7, note: "Productive day" },
];

const exercises = [
  {
    name: "Deep Breathing Exercise",
    duration: "5 mins",
    type: "Anxiety Relief",
    description: "Practice 4-7-8 breathing technique to calm your nervous system"
  },
  {
    name: "Guided Meditation",
    duration: "10 mins",
    type: "Stress Relief",
    description: "Mindfulness meditation to center yourself and reduce stress"
  },
  {
    name: "Progressive Muscle Relaxation",
    duration: "15 mins",
    type: "Physical Tension",
    description: "Release physical tension through systematic muscle relaxation"
  },
  {
    name: "Gratitude Journaling",
    duration: "5 mins",
    type: "Mood Boost",
    description: "Write down three things you're grateful for today"
  }
];

export default function VirtualPsychologist() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'therapist',
      text: "Hello, I'm your AI virtual psychologist. This is a safe, judgment-free space where you can share your thoughts and feelings. I'm here to listen and provide support for anxiety, depression, stress, and other mental health concerns. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [currentMood, setCurrentMood] = useState([5]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry') || lowerMessage.includes('nervous')) {
      return therapistResponses.anxiety;
    }
    if (lowerMessage.includes('depress') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless') || lowerMessage.includes('down')) {
      return therapistResponses.depression;
    }
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm') || lowerMessage.includes('pressure')) {
      return therapistResponses.stress;
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return therapistResponses.sleep;
    }
    
    return therapistResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getResponse(input);
      const therapistMessage: Message = {
        id: messages.length + 2,
        sender: 'therapist',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, therapistMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const toggleVideo = () => {
    setVideoActive(!videoActive);
    toast.success(videoActive ? "Video call ended" : "Video call started");
  };

  const toggleAudio = () => {
    setAudioActive(!audioActive);
    toast.success(audioActive ? "Microphone muted" : "Microphone activated");
  };

  const saveMoodEntry = () => {
    toast.success("Mood entry saved to your journal");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Virtual Psychologist</h1>
        <p className="text-gray-600 mt-2">AI-powered mental health support available 24/7</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sessions</p>
                <p className="text-2xl mt-1">24</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Mood</p>
                <p className="text-2xl mt-1">7.2/10</p>
              </div>
              <Smile className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Improvement</p>
                <p className="text-2xl mt-1">+15%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Exercises</p>
                <p className="text-2xl mt-1">18</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="therapy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="therapy">Therapy Session</TabsTrigger>
          <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
        </TabsList>

        <TabsContent value="therapy">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <Card className="lg:col-span-2 h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-purple-600">
                        <Brain className="h-5 w-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>AI Therapist</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Available 24/7
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={audioActive ? "default" : "outline"}
                      size="icon"
                      onClick={toggleAudio}
                    >
                      {audioActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={videoActive ? "default" : "outline"}
                      size="icon"
                      onClick={toggleVideo}
                    >
                      {videoActive ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={message.sender === 'therapist' ? 'bg-purple-600' : 'bg-gray-600'}>
                          {message.sender === 'therapist' ? (
                            <Brain className="h-4 w-4 text-white" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-white" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 max-w-[80%]`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === 'therapist'
                              ? 'bg-purple-50 text-purple-900'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600">
                          <Brain className="h-4 w-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></span>
                          <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>

              <CardContent className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Share your thoughts and feelings..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button onClick={handleSend} disabled={!input.trim()}>
                    Send
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This is an AI assistant and not a replacement for professional mental health care.
                </p>
              </CardContent>
            </Card>

            {/* 3D Avatar Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>3D Virtual Therapist</CardTitle>
                <CardDescription>Interactive AI-powered support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwbWVudGFsJTIwaGVhbHRofGVufDF8fHx8MTc2MjU4OTI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Virtual Therapist"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4 animate-pulse" />
                      <p>3D Avatar Active</p>
                      <Badge className="mt-2">Voice Interaction Enabled</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm mb-2">Voice Assistant Integration</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'/%3E%3C/svg%3E" className="h-4 w-4 mr-2" alt="" />
                        Google Home
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2300A8E1' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'/%3E%3C/svg%3E" className="h-4 w-4 mr-2" alt="" />
                        Alexa
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="text-blue-900">💡 Tip: You can continue this conversation on your Google Home or Alexa device</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>Track your daily mood to identify patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Very Bad</span>
                  <span className="text-sm">Neutral</span>
                  <span className="text-sm">Excellent</span>
                </div>
                <Slider
                  value={currentMood}
                  onValueChange={setCurrentMood}
                  max={10}
                  min={1}
                  step={1}
                  className="mb-2"
                />
                <p className="text-center text-2xl">{currentMood[0]}/10</p>
              </div>

              <Input placeholder="Add a note about your mood (optional)" />
              <Button className="w-full" onClick={saveMoodEntry}>Save Mood Entry</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-around gap-2">
                {moodData.map((entry, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-purple-600 rounded-t"
                      style={{ height: `${(entry.mood / 10) * 100}%`, minHeight: '10%' }}
                    ></div>
                    <p className="text-sm mt-2">{entry.date}</p>
                    <p className="text-xs text-gray-500">{entry.mood}/10</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                      <CardDescription>{exercise.type}</CardDescription>
                    </div>
                    <Badge>{exercise.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{exercise.description}</p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="journal">
          <Card>
            <CardHeader>
              <CardTitle>Therapy Journal</CardTitle>
              <CardDescription>Reflect on your thoughts and feelings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Today's Entry</label>
                <textarea
                  className="w-full min-h-[200px] p-3 border rounded-lg"
                  placeholder="What's on your mind today? Writing can help process your thoughts..."
                ></textarea>
              </div>
              <Button>Save Entry</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Emergency Resources */}
      <Card className="border-red-500 border-2">
        <CardHeader>
          <CardTitle className="text-red-600">Crisis Resources</CardTitle>
          <CardDescription>If you're in crisis, please reach out for immediate help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-red-500">
              <Phone className="h-4 w-4 mr-2" />
              Suicide Hotline: 9152987821
            </Button>
            <Button variant="outline" className="border-red-500">
              Mental Health: 080-46110007
            </Button>
            <Button variant="outline" className="border-red-500">
              Emergency: 102
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
