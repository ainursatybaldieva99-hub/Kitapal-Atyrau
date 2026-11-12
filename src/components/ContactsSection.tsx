import React, { useState } from 'react';
import {
  ATYRAU_STORE_PHONE,
  ATYRAU_STORE_INSTAGRAM,
  ATYRAU_STORE_ADDRESS,
  ATYRAU_STORE_HOURS,
} from '../utils/bookStoreLogic';
import { MapPin, Clock, Phone, Instagram, Send, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ContactsSection: React.FC = () => {
  const [askName, setAskName] = useState('');
  const [askQuestion, setAskQuestion] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleAskWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Сәлеметсіз бе, Kitapal Atyrau!`,
      askName ? `Менің атым: ${askName}` : '',
      `Сұрағым: ${askQuestion}`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${ATYRAU_STORE_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setAskName('');
      setAskQuestion('');
    }, 2500);
  };

  return (
    <section id="contacts" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200/60 mb-2">
            <MapPin className="w-3.5 h-3.5 text-rose-700" />
            Байланыс мәліметтері
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-2">
            Бізді Атыраудан табыңыз
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Кез келген сұрақ бойынша хабарласыңыз немесе дүкенімізге қонаққа келіңіз!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Address */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Дүкен мекенжайы</h4>
                <p className="text-xs sm:text-sm text-stone-700 font-medium mb-1">
                  {ATYRAU_STORE_ADDRESS}
                </p>
                <p className="text-xs text-stone-500">
                  Бағдар: Мұса Баймұханов көшесі, 1
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Жұмыс кестесі</h4>
                <p className="text-xs sm:text-sm text-stone-700 font-medium mb-1">
                  {ATYRAU_STORE_HOURS}
                </p>
                <p className="text-xs text-stone-500">Үзіліссіз және демалыссыз жұмыс жасаймыз</p>
              </div>
            </div>

            {/* Social & Messenger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${ATYRAU_STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе, Kitapal Atyrau! Кітаптар жайында білгім келеді.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-50 hover:bg-emerald-100/80 p-5 rounded-2xl border border-emerald-200 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">WhatsApp чат</h4>
                  <p className="text-xs text-emerald-800 font-mono">+7 (707) 980-12-34</p>
                  <span className="text-[10px] text-emerald-700 underline">Жазу үшін басыңыз</span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={`https://instagram.com/${ATYRAU_STORE_INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-50 hover:bg-rose-100/80 p-5 rounded-2xl border border-rose-200 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-800 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-950">Instagram парақша</h4>
                  <p className="text-xs text-rose-800 font-medium">@{ATYRAU_STORE_INSTAGRAM}</p>
                  <span className="text-[10px] text-rose-700 underline">Жазылу үшін басыңыз</span>
                </div>
              </a>
            </div>

            {/* Delivery Info Box */}
            <div className="p-4 bg-stone-100/80 rounded-xl text-xs text-stone-600 space-y-1">
              <p className="font-semibold text-stone-800">🚚 Жеткізу шарттары:</p>
              <p>• Атырау қаласы бойынша курьермен 1-2 сағат ішінде жеткізу мүмкіндігі бар.</p>
              <p>• 10 000 теңгеден жоғары тапсырыстарға қала ішінде жеткізу — тегін.</p>
              <p>• Атырау облысының аудандары мен Қазақстанның барлық қалаларына Kazpost арқылы жіберіледі.</p>
            </div>
          </div>

          {/* Quick WhatsApp Inquiry Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-rose-800" />
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                Сұрағыңыз бар ма?
              </h3>
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Кітаптың бар-жоғын немесе бағасын сұрағыңыз келсе, сұрағыңызды қалдырыңыз.
              Біздің менеджер WhatsApp арқылы дереу жауап береді.
            </p>

            {isSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-stone-900">
                  Сұрағыңыз WhatsApp-қа бағытталды!
                </p>
                <p className="text-xs text-stone-500">Kitapal Atyrau әрқашан сізбен байланыста.</p>
              </div>
            ) : (
              <form onSubmit={handleAskWhatsApp} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Сіздің есіміңіз</label>
                  <input
                    type="text"
                    required
                    placeholder="Мысалы: Аружан"
                    value={askName}
                    onChange={(e) => setAskName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Сұрағыңыз немесе іздеген кітабыңыз
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Мысалы: «Абай жолы» кітабы қоймада бар ма? Және қашан жеткізе аласыздар?"
                    value={askQuestion}
                    onChange={(e) => setAskQuestion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp арқылы жауап алу</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
