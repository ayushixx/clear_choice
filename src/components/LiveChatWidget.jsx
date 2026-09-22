import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone } from 'lucide-react';

export default function LiveChatWidget({ setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! If you are in crisis, please click the green button to connect with a real person. Otherwise, browse our facts.',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const replyMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Thank you for reaching out. A specialist counselor can assist you immediately on our 24/7 Helpline 1800-11-0031.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showActions: true
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-40">
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#2E031D] text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center border border-white/20 touch-target btn-tap"
          aria-label="Open Crisis Live Chat"
        >
          <MessageSquare className="w-5 h-5 text-[#E03590]" />
        </button>
      )}

      {isOpen && (
        <div className="bg-[var(--bg-card)] w-[calc(100vw-2rem)] max-w-[350px] sm:w-88 rounded-3xl shadow-2xl border border-editorial overflow-hidden flex flex-col h-[440px] sm:h-[460px]">
          
          <div className="bg-[#2E031D] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/logo.png" 
                alt="Logo" 
                className="h-6 w-auto object-contain"
              />
              <div>
                <h4 className="font-serif font-bold text-xs leading-none">Clear Choice Support</h4>
                <span className="text-[9px] text-[#FDF3F7]/70 font-mono">Confidential Helpline</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FDF3F7]/80 hover:text-white p-2 rounded-full hover:bg-white/10 touch-target btn-tap flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-emerald-800 text-white p-3 text-xs flex items-center justify-between">
            <span className="font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Immediate Crisis?
            </span>
            <a
              href="tel:1800110031"
              className="bg-white text-emerald-900 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider touch-target flex items-center justify-center shadow-xs"
            >
              Connect Real Person
            </a>
          </div>

          <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-[var(--bg-secondary)] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#2E031D] text-white rounded-tr-xs'
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-editorial shadow-xs rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[9px] text-muted mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-[var(--bg-card)] border-t border-editorial flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message..."
              className="flex-1 text-sm px-3.5 py-2.5 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-editorial rounded-xl focus:outline-none focus:border-[#E03590]"
            />
            <button
              type="submit"
              className="bg-[#2E031D] text-white p-2.5 rounded-xl transition-all btn-tap touch-target flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] shadow-sm"
            >
              <Send className="w-4 h-4 text-[#E03590]" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
