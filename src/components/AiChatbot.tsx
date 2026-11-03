import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, MapPin, ChevronRight, User } from 'lucide-react';
import { Property } from '../types';

interface AiChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
  properties?: Property[];
  onSelectProperty?: (property: Property) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  recommendedProperties?: Property[];
  timestamp: string;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  properties = [],
  onSelectProperty
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggleOpen = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Assalam o Alaikum! I am the ri8click Real Estate Assistant. How can I assist you with properties in Faisal Hills, Taxila, Commercial Plazas, or Capsule Modular Houses?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate smart AI response matching user intent
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse = '';
      let matches: Property[] = [];

      if (lower.includes('faisal hills') || lower.includes('faisal') || lower.includes('taxila')) {
        matches = properties.filter(p => p.location.society.toLowerCase().includes('faisal') || p.location.city.toLowerCase().includes('taxila')).slice(0, 2);
        botResponse = `Faisal Hills is situated right on Grand Trunk (GT) Road near the Margalla Hills. We have verified residential plots, luxury designer villas, and commercial Broadway plazas available. Here are top recommended listings:`;
      } else if (lower.includes('commercial') || lower.includes('plaza') || lower.includes('shop') || lower.includes('office')) {
        matches = properties.filter(p => p.category === 'commercial' || p.type.toLowerCase().includes('plaza')).slice(0, 2);
        botResponse = `Our commercial properties offer guaranteed rental yield and high footfall along Commercial Broadway & GT Road Taxila. Here are key commercial options:`;
      } else if (lower.includes('capsule') || lower.includes('modular') || lower.includes('prefab')) {
        matches = properties.filter(p => p.category === 'modular' || p.title.toLowerCase().includes('capsule')).slice(0, 2);
        botResponse = `ri8click Readymade Space Capsules are turnkey prefab homes made with aeronautical aluminum and smart IoT controls. Delivery takes 30 days anywhere in Pakistan.`;
      } else if (lower.includes('upvc') || lower.includes('window') || lower.includes('door')) {
        botResponse = `ri8click UPVC Products division manufactures European standard double-glazed soundproof and thermal insulating windows and doors for residential villas and corporate towers. Would you like our UPVC catalog?`;
      } else if (lower.includes('price') || lower.includes('budget') || lower.includes('cost') || lower.includes('rate')) {
        matches = properties.slice(0, 2);
        botResponse = `Plots in Faisal Hills start from PKR 45 Lakhs for 5 Marla, while luxury constructed villas range from PKR 2.4 Crore to 5 Crore. Here are active listings matching prime values:`;
      } else {
        matches = properties.slice(0, 2);
        botResponse = `Thank you for your inquiry! Our certified agents in Taxila & Faisal Hills can provide customized brochures and arrange a free physical site visit.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        recommendedProperties: matches.length > 0 ? matches : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
        aria-label="Toggle AI Advisor"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Ask Property AI
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>ri8click AI Advisor</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-400">Taxila & Faisal Hills Real Estate Guide</p>
              </div>
            </div>

            <button
              onClick={toggleOpen}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-1.5 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Optional Recommended Properties in Bot Response */}
                  {m.recommendedProperties && m.recommendedProperties.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {m.recommendedProperties.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProperty && onSelectProperty(p)}
                          className="bg-white p-2 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all flex items-center gap-2 shadow-2xs"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-bold text-slate-900 truncate">{p.title}</div>
                            <div className="text-[10px] text-blue-600 font-semibold">{p.priceFormatted}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[9.5px] text-slate-400 block">{m.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[10.5px]">
            <button
              onClick={() => handleSend('Tell me about Faisal Hills blocks')}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 whitespace-nowrap transition-colors"
            >
              Faisal Hills Blocks
            </button>
            <button
              onClick={() => handleSend('Show me commercial plazas')}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 whitespace-nowrap transition-colors"
            >
              Commercial Plazas
            </button>
            <button
              onClick={() => handleSend('Readymade capsule house details')}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 whitespace-nowrap transition-colors"
            >
              Capsule Houses
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask about properties, prices, or tours..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:outline-hidden focus:bg-white focus:border-blue-600"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AiChatbot;
