import React, { useState, useMemo } from 'react';
import { Book, BookCategory } from '../types/book';
import { BookCard } from './BookCard';
import { filterBooks, SortOption } from '../utils/bookStoreLogic';
import { Search, SlidersHorizontal, Plus, BookOpen, X } from 'lucide-react';

interface CatalogSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onOpenAddBook: () => void;
  onEditBook: (book: Book) => void;
}

const CATEGORIES: BookCategory[] = [
  'Барлығы',
  'Қазақ әдебиеті',
  'Әлем әдебиеті',
  'Діни әдебиет',
  'Балалар әдебиеті',
  'Психология және өзін-өзі дамыту',
  'Тарих және таным',
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  onOpenAddBook,
  onEditBook,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('Барлығы');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeTag, setActiveTag] = useState<'all' | 'new' | 'popular' | 'discount' | 'recommended'>('all');

  const filteredBooks = useMemo(() => {
    return filterBooks(books, {
      category: selectedCategory,
      query: searchQuery,
      sortBy,
      tag: activeTag,
    });
  }, [books, selectedCategory, searchQuery, sortBy, activeTag]);

  const handleClearFilters = () => {
    setSelectedCategory('Барлығы');
    setSearchQuery('');
    setSortBy('popular');
    setActiveTag('all');
  };

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Кітап сөресі</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
              Kitapal Каталогы
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Қазақ және әлем әдебиетінің таңдаулы туындылары, рухани және танымдық еңбектер
            </p>
          </div>

          {/* Add Book Button for store manager */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAddBook}
              data-testid="catalog-add-book-btn"
              className="py-2.5 px-4 bg-white hover:bg-stone-100 text-rose-900 border border-stone-300 rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4 text-rose-800" />
              <span>Жаңа кітап қосу / Өңдеу</span>
            </button>
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Кітап атауы, автор немесе мазмұны бойынша іздеу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-rose-800 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Іздеуді тазарту"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-stone-500 hidden sm:block" />
              <label htmlFor="sort-select" className="text-xs text-stone-500 whitespace-nowrap hidden sm:inline">
                Сұрыптау:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-rose-800"
              >
                <option value="popular">Танымалдығы бойынша</option>
                <option value="price-asc">Бағасы: арзаннан қымбатқа</option>
                <option value="price-desc">Бағасы: қымбаттан арзанға</option>
                <option value="rating">Рейтингі бойынша</option>
                <option value="newest">Жаңа басылымдар</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Tags (New, Popular, Discount, Recommended) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-stone-100 text-xs">
            <span className="text-stone-400 text-[11px] mr-1">Сүзгі:</span>
            <button
              type="button"
              onClick={() => setActiveTag('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTag === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Барлық кітаптар
            </button>
            <button
              type="button"
              onClick={() => setActiveTag('popular')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTag === 'popular'
                  ? 'bg-rose-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              🔥 Танымал кітаптар
            </button>
            <button
              type="button"
              onClick={() => setActiveTag('new')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTag === 'new'
                  ? 'bg-rose-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              ✨ Ай жаңалықтары
            </button>
            <button
              type="button"
              onClick={() => setActiveTag('discount')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTag === 'discount'
                  ? 'bg-rose-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              🏷 Жеңілдіктер
            </button>
            <button
              type="button"
              onClick={() => setActiveTag('recommended')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTag === 'recommended'
                  ? 'bg-rose-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              ⭐ Оқырмандар таңдауы
            </button>
          </div>
        </div>

        {/* Category Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'Барлығы'
                ? books.length
                : books.filter((b) => b.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-rose-800 text-white shadow-md shadow-rose-950/10'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-rose-950 text-rose-100' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter and Active Filter Feedback */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <p>
            Табылды: <strong className="text-stone-900">{filteredBooks.length}</strong> кітап
            {selectedCategory !== 'Барлығы' && (
              <span> · Категория: «{selectedCategory}»</span>
            )}
            {searchQuery && <span> · Сұраныс: «{searchQuery}»</span>}
          </p>

          {(selectedCategory !== 'Барлығы' || searchQuery || activeTag !== 'all') && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-rose-800 hover:underline font-medium text-xs flex items-center gap-1"
            >
              Сүзгіні тазарту
            </button>
          )}
        </div>

        {/* Book Cards Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                onAddToCart={onAddToCart}
                onEdit={onEditBook}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-editorial text-lg font-bold text-stone-900 mb-1">
              Кітап табылмады
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Іздеу сұранысын немесе категорияны өзгертіп көріңіз, немесе жаңа кітап қосыңыз.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="py-2 px-4 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
            >
              Барлық кітаптарды көрсету
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
