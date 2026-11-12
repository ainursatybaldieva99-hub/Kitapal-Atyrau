import React from 'react';
import { BookOpen, Heart, ArrowUp } from 'lucide-react';
import {
  ATYRAU_STORE_PHONE,
  ATYRAU_STORE_INSTAGRAM,
  ATYRAU_STORE_ADDRESS,
  ATYRAU_STORE_HOURS,
} from '../utils/bookStoreLogic';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-700 text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-editorial text-2xl font-bold text-white tracking-tight">
                Kitapal <span className="text-rose-400">Atyrau</span>
              </span>
            </div>

            <p className="font-editorial text-lg text-rose-200/90 italic font-semibold">
              «Қазақстанды кітап оқитын елге айналдырайық!»
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Kitapal Atyrau — Атырау қаласындағы оқырмандар кеңістігі мен сапалы кітаптар дүкені.
              Рухани байлық, оқу мәдениеті және ұлт болашағы үшін қызмет етеміз.
            </p>

              <div className="text-xs text-stone-400 pt-2">
                <p>📍 {ATYRAU_STORE_ADDRESS}</p>
                <p className="mt-1">⏰ {ATYRAU_STORE_HOURS}</p>
              </div>
          </div>

          {/* Catalog Categories */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Кітап бөлімдері
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Қазақ әдебиеті
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Әлем әдебиеті
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Діни әдебиет
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Балалар әдебиеті
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Психология және өзін-өзі дамыту
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Тарих және таным
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Projects */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Жобалар мен ақпарат
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="hover:text-rose-300 transition-colors"
                >
                  «Ауылға кітап» жобасы
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Kitapal Кітап клубы
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Кітап кездесулері
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Біз туралы & Миссия
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contacts')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Байланыс & Жеткізу
                </button>
              </li>
            </ul>
          </div>

          {/* Social & WhatsApp */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Тікелей байланыс
            </h4>
            <p className="text-stone-400">
              Сұрақтарыңыз болса, кез келген уақытта жазыңыз:
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={`https://wa.me/${ATYRAU_STORE_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                WhatsApp: +7 (707) 980-12-34
              </a>
              <a
                href={`https://instagram.com/${ATYRAU_STORE_INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-rose-400 hover:text-rose-300 font-semibold"
              >
                Instagram: @{ATYRAU_STORE_INSTAGRAM}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Kitapal Atyrau. Барлық құқықтар қорғалған.
            <span className="hidden sm:inline">· Махаббатпен жасалған</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
          >
            <span>Жоғарыға оралу</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
