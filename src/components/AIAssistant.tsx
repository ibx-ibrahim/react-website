import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Bot, Send, Mic, User, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! I'm your AI Healthcare Assistant. I can help you with health questions, symptom checking, and general medical information. How can I assist you today?",
    timestamp: new Date(),
    suggestions: [
      "Check symptoms",
      "Find nearby doctors",
      "Medication information",
      "Health tips"
    ]
  }
];

const sampleResponses: { [key: string]: { text: string; suggestions?: string[] } } = {
  headache: {
    text: "Headaches can have various causes including stress, dehydration, eye strain, or lack of sleep. For mild headaches, try:\n\n• Rest in a quiet, dark room\n• Stay hydrated\n• Apply a cold or warm compress\n• Practice relaxation techniques\n\nIf headaches are severe, frequent, or accompanied by other symptoms like fever, vision changes, or neck stiffness, please consult a doctor immediately.",
    suggestions: ["Find a doctor", "Nearby pharmacies", "More symptoms"]
  },
  fever: {
    text: "A fever (temperature above 100.4°F/38°C) is usually a sign your body is fighting an infection. General care includes:\n\n• Stay hydrated with water and clear fluids\n• Rest adequately\n• Use fever-reducing medication if needed\n• Monitor your temperature regularly\n\nSeek immediate medical attention if:\n• Fever is above 103°F (39.4°C)\n• Lasts more than 3 days\n• Accompanied by severe symptoms",
    suggestions: ["Book consultation", "Emergency services", "Track symptoms"]
  },
  diet: {
    text: "A balanced diet is crucial for good health. Here are some general guidelines:\n\n• Include plenty of fruits and vegetables (5+ servings daily)\n• Choose whole grains over refined grains\n• Include lean proteins (fish, poultry, legumes)\n• Limit processed foods and added sugars\n• Stay hydrated (8+ glasses of water daily)\n• Practice portion control\n\nWould you like a personalized diet plan based on your health profile?",
    suggestions: ["Create diet plan", "Calorie calculator", "Nutrition tips"]
  }
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAIResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      return sampleResponses.headache;
    }
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return sampleResponses.fever;
    }
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('food')) {
      return sampleResponses.diet;
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        text: "Hello! How can I help you with your health today?",
        suggestions: ["Symptom checker", "Find doctor", "Health records"]
      };
    }
    
    return {
      text: "I understand you're asking about: \"" + userMessage + "\". While I can provide general health information, please consult with a healthcare professional for personalized medical advice. Would you like me to help you book a consultation with a doctor?",
      suggestions: ["Book consultation", "Emergency help", "More questions"]
    };
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
      const response = getAIResponse(input);
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleVoiceToggle = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setTimeout(() => setVoiceActive(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>AI Healthcare Assistant</h1>
        <p className="text-gray-600 mt-2">Get instant answers to your health questions powered by AI</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p>AI-Powered</p>
                <p className="text-sm text-gray-500">Advanced health insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p>24/7 Available</p>
                <p className="text-sm text-gray-500">Always here to help</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p>Symptom Checker</p>
                <p className="text-sm text-gray-500">Quick health assessment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-blue-600">
                  <Bot className="h-5 w-5 text-white" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Health Assistant</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Online
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary">Beta</Badge>
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
                  <AvatarFallback className={message.sender === 'ai' ? 'bg-blue-600' : 'bg-gray-600'}>
                    {message.sender === 'ai' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'items-end' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'ai'
                        ? 'bg-gray-100'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600">
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <CardContent className="border-t p-4">
          <div className="flex gap-2">
            <Button
              variant={voiceActive ? "default" : "outline"}
              size="icon"
              onClick={handleVoiceToggle}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Ask me anything about your health..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This AI assistant provides general information only. Always consult a healthcare professional for medical advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
