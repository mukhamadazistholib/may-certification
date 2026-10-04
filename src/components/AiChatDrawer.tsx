import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareQuote,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  BookOpen,
  ShieldAlert,
  Loader2,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  referenceChapter?: string;
}

const QUICK_SUGGESTIONS = [
  'Bagaimana posisi Durant saat komplikasi emboli udara?',
  'Apa kriteria Rule of Six KDOQI pada AV-Fistula?',
  'Kapan dialiser proses ulang wajib diafkir/dibuang?',
  'Berapa target Kt/V menurut PERNEFRI vs KDOQI?',
  'Apa tanda diagnosis peritonitis pada pasien CAPD?',
  'Berapa standar AAMI untuk bakteri dan endotoksin air?'
];

export const AiChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Halo Ners! Saya Asisten Ahli Klinis Dialisis IPDI. Saya siap membantu Anda mengonfirmasi teori, rasional patofisiologi, batas nilai kritis, dan asuhan keperawatan dialisis yang bersumber langsung dari **Modul Resertifikasi Perawat Dialisis Indonesia (PP IPDI 2021)**.\n\nAda materi yang ingin Anda tanyakan seputar 9 Bab Modul?',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build history
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.message || 'Gagal memproses jawaban');
      }
    } catch (err: any) {
      console.warn('AI Chat request fallback:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        text: 'Mohon maaf, terjadi kendala sesaat pada koneksi AI. Silakan ulangi pertanyaan Anda atau pilih salah satu topik saran modul di bawah.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: 'Riwayat obrolan telah dibersihkan. Silakan ajukan pertanyaan seputar materi Modul Resertifikasi Perawat Dialisis IPDI 2021.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 hover:from-teal-600 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-teal-900/25 border border-teal-400/30 transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
            title="Buka Asisten Tanya AI Modul IPDI"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-teal-800" />
            </div>
            <span className="font-extrabold tracking-tight">Tanya AI Modul IPDI</span>
            <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Gemini
            </span>
          </button>
        </div>
      )}

      {/* Slide-in Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end sm:p-6 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full sm:max-w-md md:max-w-lg h-[92vh] sm:h-[82vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-4 sm:p-4.5 flex items-center justify-between border-b border-teal-800/40">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Tanya AI Modul IPDI
                    </h3>
                    <span className="text-[9px] bg-teal-400/20 text-teal-300 border border-teal-400/40 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                      Modul IPDI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Konteks Jawaban Dibatasi 9 Bab Modul IPDI 2021
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleResetChat}
                  title="Hapus riwayat obrolan"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scope boundary notification banner */}
            <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/40 px-4 py-2 flex items-center space-x-2 text-[11px] text-amber-900 dark:text-amber-300 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>Konteks AI dibatasi ketat hanya pada materi 9 Bab Modul Dialisis IPDI.</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((m) => {
                const isBot = m.role === 'assistant';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start space-x-2.5 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                        isBot ? 'bg-teal-700 dark:bg-teal-600 shadow-xs' : 'bg-slate-700 dark:bg-slate-600'
                      }`}
                    >
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[85%] group relative ${isBot ? 'text-left' : 'text-right'}`}>
                      <div
                        className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                          isBot
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 shadow-xs'
                            : 'bg-teal-600 text-white rounded-tr-none shadow-xs'
                        }`}
                      >
                        {m.text}
                      </div>

                      <div className="flex items-center space-x-2 mt-1 px-1 text-[10px] text-slate-400">
                        <span>{m.timestamp}</span>
                        {isBot && (
                          <button
                            onClick={() => handleCopy(m.id, m.text)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            title="Salin jawaban"
                          >
                            {copiedId === m.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400 text-xs py-2">
                  <div className="w-7 h-7 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600 dark:text-teal-400" />
                    <span>Menganalisis modul IPDI...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                Rekomendasi Topik Modul:
              </p>
              <div className="flex overflow-x-auto gap-1.5 pb-1 scrollbar-none">
                {QUICK_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    disabled={isLoading}
                    onClick={() => handleSendMessage(item)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-300 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  disabled={isLoading}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tanyakan materi dialisis sesuai modul IPDI..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
