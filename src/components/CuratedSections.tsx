import React, { useState } from 'react';
import { Book } from '../types/book';
import { BookCard } from './BookCard';
import { Sparkles, Flame, Tag, BookmarkCheck, ArrowRight } from 'lucide-react';

interface CuratedSectionsProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onViewAllCatalog: () => void;
}

type TabType = 'new' | 'popular' | 'discounts' | 'recommended';

export const CuratedSections: React.FC<CuratedSectionsProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  onViewAllCatalog,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('new');

  const tabConfig = [
    {
      id: 'new' as TabType,
      title: 'Айдың жаңалықтары',
      subtitle: 'Жақында ғана баспадан шыққан тың туындылар',
      icon: Sparkles,
      filter: (b: Book) => Boolean(b.isNew),
    },
    {
      id: 'popular' as TabType,
      title: 'Танымал кітаптар',
      subtitle: 'Атыраулық оқырмандар ең көп оқыған бестселлерлер',
      icon: Flame,
      filter: (b: Book) => Boolean(b.isPopular),
    },
    {
      id: 'discounts' as TabType,
      title: 'Арнайы ұсыныстар & жеңілдіктер',
      subtitle: 'Тиімді бағамен кітап сөреңізді толықтырыңыз',
      icon: Tag,
      filter: (b: Book) => Boolean(b.isSpecialOffer || (b.originalPrice && b.originalPrice > b.price)),
    },
    {
      id: 'recommended' as TabType,
      title: 'Оқырмандарға ұсыныстар',
      subtitle: 'Kitapal әдеби кеңесшілерінің таңдауы',
      icon: BookmarkCheck,
      filter: (b: Book) => Boolean(b.isRecommended),
    },
  ];

  const currentConfig = tabConfig.find((t) => t.id === activeTab) || tabConfig[0];
  const displayedBooks = books.filter(currentConfig.filter).slice(0, 4);

  return (
    <section id="curated" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-rose-800 text-xs font-bold uppercase tracking-wider">
            Арнайы топтамалар
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mt-1 mb-2">
            Таңдаулы әдебиеттер шоғыры
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Жаңа туындылардан бастап уақыт сынынан өткен жауһарларға дейін
          </p>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-stone-100 rounded-2xl max-w-4xl w-full">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-white text-rose-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-800' : 'text-stone-400'}`} />
                  <span className="truncate">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Subtitle */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-100">
          <div>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900">
              {currentConfig.title}
            </h3>
            <p className="text-xs text-stone-500">{currentConfig.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onViewAllCatalog}
            className="text-xs text-rose-800 font-semibold hover:text-rose-900 flex items-center gap-1 group whitespace-nowrap"
          >
            Барлығын көру
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
