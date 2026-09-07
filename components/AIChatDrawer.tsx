'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { quickPrompts, QuickPrompt } from '@/lib/ai-knowledge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose }) => {
  
  const initialGreeting = true
    ? 'Halo! Temukan panduan resmi Zadit. Tanyakan apa saja seputar 4 pilar layanan, pengalaman kerja 10+ tahun, atau studi kasus nyata yang pernah diselesaikan.'
    : 'Hello! I am Zadit\'s official representative assistant. Feel free to ask about the 4 core solution pillars, 10+ years of background, or verified client outcomes.';

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: initialGreeting,
      timestamp: 'Baru saja'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting if language changes and only initial message is present
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([
        {
          role: 'assistant',
          content: initialGreeting,
          timestamp: 'Baru saja'
        }
      ]);
    }
  }, [initialGreeting, messages.length]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSelectPrompt = (prompt: QuickPrompt) => {
    const userMsg: Message = {
      role: 'user',
      content: prompt.question.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        role: 'assistant',
        content: prompt.answer.id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    const userMsg: Message = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let answer = true
        ? 'Zadit berpengalaman lebih dari 10 tahun (sejak 2015) menyediakan 4 pilar solusi: Dokumen Bisnis & Proposal Eksekutif, SEO & Konten Konversi, Riset Akademik & Olah Data Statistik, serta Solusi Web Cepat. Silakan gunakan formulir konsultasi di situs ini untuk terhubung langsung via WhatsApp di +62 823-1636-3177.'
        : 'Zadit has over 10 years of experience delivering 4 integrated pillars: Business Proposals, SEO & High-Converting Content, Academic Research & Statistics, and High-Speed Web Solutions. Please use the consultation builder on this site or connect via WhatsApp (+62 823-1636-3177).';

      if (lower.includes('pilar') || lower.includes('pillar') || lower.includes('layanan') || lower.includes('service') || lower.includes('apa saja')) {
        answer = quickPrompts[0].answer.id;
      } else if (lower.includes('seo') || lower.includes('leads') || lower.includes('peringkat') || lower.includes('organik') || lower.includes('wom')) {
        answer = quickPrompts[1].answer.id;
      } else if (lower.includes('sinta') || lower.includes('jurnal') || lower.includes('skripsi') || lower.includes('statistik') || lower.includes('spss') || lower.includes('riset') || lower.includes('academic')) {
        answer = quickPrompts[2].answer.id;
      } else if (lower.includes('proposal') || lower.includes('deck') || lower.includes('pitch') || lower.includes('investor') || lower.includes('kemitraan') || lower.includes('agribisnis')) {
        answer = quickPrompts[3].answer.id;
      } else if (lower.includes('kontak') || lower.includes('hubungi') || lower.includes('whatsapp') || lower.includes('biaya') || lower.includes('harga') || lower.includes('contact')) {
        answer = quickPrompts[4].answer.id;
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header with High Contrast */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900">
                {true ? 'Pusat Panduan & FAQ Terverifikasi' : 'Ask Zadit\'s AI Assistant'}
              </h2>
              <p className="font-mono text-xs text-teal-800 font-bold">
                {true ? 'Profil Terverifikasi & Rekam Jejak' : 'Grounded on Verified Records'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            aria-label={true ? 'Tutup drawer' : 'Close drawer'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Chips */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-white">
          <p className="text-xs font-mono text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>{true ? 'Pertanyaan Populer:' : 'Quick Questions:'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPrompt(p)}
                className="text-xs font-sans font-semibold px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 hover:border-teal-700 hover:text-teal-900 hover:bg-teal-50/50 transition-all text-left shadow-2xs text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                {p.label.id}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm font-sans">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-300 flex items-center justify-center text-teal-800 shrink-0 mt-0.5 font-bold">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-4 rounded-2xl leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none font-medium'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-none font-normal'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                <span className="block text-xs mt-2 opacity-75 font-mono text-right">
                  {m.timestamp}
                </span>
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-slate-700 font-mono text-xs pl-10">
              <span className="w-2 h-2 rounded-full bg-teal-700 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-teal-700 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-teal-700 animate-bounce [animation-delay:0.4s]"></span>
              <span className="font-semibold">{true ? 'Menyusun jawaban...' : 'Generating response...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with High Contrast */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <label htmlFor="ai-chat-input" className="sr-only">
              {true ? 'Cari Panduan' : 'Ask AI Assistant'}
            </label>
            <input
              id="ai-chat-input"
              name="chatMessage"
              aria-label={true ? 'Cari Panduan' : 'Ask AI Assistant'}
              type="text"
              placeholder={true ? 'Ketik topik pencarian untuk Zadit...' : 'Ask a question about Zadit...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white transition-colors font-sans placeholder:text-slate-500 font-medium"
            />
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50 shrink-0 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              disabled={!inputValue.trim()}
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
