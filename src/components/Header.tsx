import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Plus, Menu, X, Phone } from 'lucide-react';
import { ATYRAU_STORE_PHONE } from '../utils/bookStoreLogic';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAddBook: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAddBook,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Басты бет' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'curated', label: 'Жаңалықтар' },
    { id: 'about', label: 'Біз туралы' },
    { id: 'projects', label: 'Жобалар' },
    { id: 'contacts', label: 'Байланыс' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-800 text-white flex items-center justify-center shadow-sm group-hover:bg-rose-900 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap block leading-none">
                Kitapal <span className="text-rose-800">Atyrau</span>
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide uppercase">
                Кітап дүкені & кеңістік
              </span>
            </div>
          </button>

          {/* Zone 2: 4–6 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-rose-800 relative py-1 ${
                  activeSection === link.id ? 'text-rose-800 font-semibold' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-800 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary action + Cart + Admin Adder */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Quick add/edit book button */}
            <button
              type="button"
              onClick={onOpenAddBook}
              data-testid="header-add-book-btn"
              title="Жаңа кітап қосу немесе каталогты өңдеу"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 text-rose-800" />
              <span>Кітап қосу</span>
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${ATYRAU_STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе! Kitapal Atyrau бойынша сұрағым бар еді.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp байланыс</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Себетте ${cartCount} кітап`}
              className="relative p-2.5 bg-rose-800 hover:bg-rose-900 text-white rounded-xl transition-all shadow-sm flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 bg-stone-100 rounded-lg"
              aria-label="Мәзірді ашу"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-100 space-y-2 bg-white">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-rose-50 text-rose-800 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddBook();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-rose-900 bg-rose-50 border border-rose-200 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                Жаңа кітап қосу / Өңдеу
              </button>
              <a
                href={`https://wa.me/${ATYRAU_STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе! Kitapal Atyrau дүкеніне хабарласып тұрмын.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp: +7 (707) 980-12-34
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
