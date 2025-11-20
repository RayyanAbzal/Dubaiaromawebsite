import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import logo from 'figma:asset/1a25be5b0000f72d7e6946a94dc24f6ab7b3130a.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your fragrance expert assistant. I can help you find the perfect perfume based on your preferences. What type of scent are you looking for today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'Fresh & Floral',
        'Woody & Spicy',
        'Sweet & Oriental',
        'Light & Citrus'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace this with your actual AI implementation)
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Mock response generator - replace with your actual AI integration
  const generateBotResponse = (userText: string): Message => {
    const lowerText = userText.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];

    if (lowerText.includes('fresh') || lowerText.includes('floral')) {
      response = "Great choice! Fresh and floral scents are perfect for everyday wear. I recommend exploring our Rose, Jasmine, and Lavender-based perfumes. Would you like something more feminine, masculine, or unisex?";
      suggestions = ['Feminine', 'Masculine', 'Unisex', 'Show me options'];
    } else if (lowerText.includes('woody') || lowerText.includes('spicy')) {
      response = "Woody and spicy fragrances are sophisticated and bold! Our Oud, Sandalwood, and Amber collections would be perfect. Are you looking for something for day or evening wear?";
      suggestions = ['Day wear', 'Evening wear', 'Both', 'Show recommendations'];
    } else if (lowerText.includes('sweet') || lowerText.includes('oriental')) {
      response = "Sweet oriental scents are luxurious and long-lasting! I'd recommend our Arabian Nights collection with notes of vanilla, musk, and amber. What's your budget range?";
      suggestions = ['Under $50', '$50-$100', '$100+', 'Show all'];
    } else if (lowerText.includes('gift') || lowerText.includes('present')) {
      response = "Looking for a gift? That's wonderful! I can help you find the perfect fragrance. Who is it for, and do you know their scent preferences?";
      suggestions = ['For her', 'For him', 'Unisex', 'Gift sets'];
    } else if (lowerText.includes('oud')) {
      response = "Oud is one of our most popular notes! It's rich, woody, and luxurious. We have several Oud-based perfumes ranging from traditional Arabian blends to modern interpretations. Would you like to see our Oud collection?";
      suggestions = ['Traditional Oud', 'Modern Oud', 'Oud blends', 'View all'];
    } else if (lowerText.includes('feminine') || lowerText.includes('women')) {
      response = "Our women's collection features elegant florals, sweet vanillas, and sophisticated musks. Popular choices include Rose Divine, Jasmine Dreams, and Amber Mystique. Would you like recommendations based on occasions?";
      suggestions = ['Everyday', 'Special occasions', 'Office wear', 'View collection'];
    } else if (lowerText.includes('masculine') || lowerText.includes('men')) {
      response = "Our men's collection offers bold woody notes, fresh citrus, and spicy accords. Top picks are Royal Oud, Sandalwood Reserve, and Amber King. What's your preferred intensity?";
      suggestions = ['Light & fresh', 'Moderate', 'Strong & bold', 'View collection'];
    } else {
      response = "I'd love to help you find the perfect fragrance! Could you tell me more about what you're looking for? For example, do you prefer fresh, woody, floral, or oriental scents?";
      suggestions = ['Fresh scents', 'Woody scents', 'Floral scents', 'Oriental scents'];
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
          size="icon"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <CardHeader className="border-b bg-gradient-to-r from-secondary/10 to-primary/10 flex-shrink-0 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={logo} alt="Dubai Aroma AI" className="h-10 w-10" />
                  <span className="absolute bottom-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                  </span>
                </div>
                <div>
                  <h3 className="flex items-center gap-2">
                    Fragrance Assistant
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </h3>
                  <p className="text-xs text-muted-foreground">AI-Powered Perfume Finder</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          message.sender === 'user'
                            ? 'bg-secondary text-white'
                            : 'bg-muted'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-3 w-3 text-secondary" />
                            <span className="text-xs opacity-70">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 ml-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7 rounded-full"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <CardContent className="border-t p-4 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about fragrances..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Powered by AI • Here to help you find your perfect scent
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}