import React, { useState, useEffect } from 'react';
import { Book, BookCategory } from '../types/book';
import { validateBook } from '../utils/bookStoreLogic';
import { X, Save, Plus, AlertCircle, RotateCcw } from 'lucide-react';

interface BookEditorModalProps {
  book: Book | null; // null means adding a new book
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  onResetDefaults?: () => void;
}

const CATEGORIES: Exclude<BookCategory, 'Барлығы'>[] = [
  'Қазақ әдебиеті',
  'Әлем әдебиеті',
  'Діни әдебиет',
  'Балалар әдебиеті',
  'Психология және өзін-өзі дамыту',
  'Тарих және таным',
];

export const BookEditorModal: React.FC<BookEditorModalProps> = ({
  book,
  isOpen,
  onClose,
  onSave,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: 'Қазақ әдебиеті',
    price: 3500,
    originalPrice: undefined,
    coverUrl: '',
    coverColorTheme: 'crimson',
    description: '',
    fullDescription: '',
    pages: 250,
    year: 2024,
    binding: 'Қатты мұқаба',
    language: 'Қазақша',
    publisher: 'Kitapal Баспасы',
    isbn: '978-601-00-0000-0',
    isNew: true,
    isPopular: false,
    isSpecialOffer: false,
    isRecommended: true,
    rating: 4.8,
    reviewsCount: 15,
    inStock: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        id: `book-${Date.now()}`,
        title: '',
        author: '',
        category: 'Қазақ әдебиеті',
        price: 3500,
        originalPrice: undefined,
        coverUrl: '',
        coverColorTheme: 'crimson',
        description: '',
        fullDescription: '',
        pages: 250,
        year: 2024,
        binding: 'Қатты мұқаба',
        language: 'Қазақша',
        publisher: 'Kitapal Баспасы',
        isbn: `978-601-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1 + Math.random() * 9)}`,
        isNew: true,
        isPopular: false,
        isSpecialOffer: false,
        isRecommended: true,
        rating: 4.8,
        reviewsCount: 12,
        inStock: true,
      });
    }
    setErrors({});
  }, [book, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBook(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const savedBook: Book = {
      id: formData.id || `book-${Date.now()}`,
      title: formData.title!.trim(),
      author: formData.author!.trim(),
      category: formData.category as Exclude<BookCategory, 'Барлығы'>,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      coverUrl: formData.coverUrl?.trim() || undefined,
      coverColorTheme: formData.coverColorTheme || 'crimson',
      description: formData.description!.trim(),
      fullDescription: formData.fullDescription?.trim() || formData.description!.trim(),
      pages: Number(formData.pages) || 200,
      year: Number(formData.year) || 2024,
      binding: formData.binding || 'Қатты мұқаба',
      language: formData.language || 'Қазақша',
      publisher: formData.publisher?.trim() || 'Kitapal',
      isbn: formData.isbn?.trim() || '978-601-00-0000-0',
      isNew: Boolean(formData.isNew),
      isPopular: Boolean(formData.isPopular),
      isSpecialOffer: Boolean(formData.isSpecialOffer),
      isRecommended: Boolean(formData.isRecommended),
      rating: formData.rating || 4.8,
      reviewsCount: formData.reviewsCount || 10,
      inStock: formData.inStock ?? true,
    };

    onSave(savedBook);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Жабу"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-700"></span>
          <h2 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900">
            {book ? 'Кітап деректерін өңдеу' : 'Жаңа кітап қосу'}
          </h2>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Кітаптың атауын, бағасын, суретін және сипаттамасын еркін өзгерте аласыз.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Кітап атауы <span className="text-rose-700">*</span>
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Мысалы: Абай жолы"
                className={`w-full px-3 py-2 bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800 ${
                  errors.title ? 'border-red-400' : 'border-stone-300'
                }`}
              />
              {errors.title && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Авторы <span className="text-rose-700">*</span>
              </label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Мысалы: Мұхтар Әуезов"
                className={`w-full px-3 py-2 bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800 ${
                  errors.author ? 'border-red-400' : 'border-stone-300'
                }`}
              />
              {errors.author && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.author}
                </p>
              )}
            </div>
          </div>

          {/* Category & Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Категориясы <span className="text-rose-700">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Exclude<BookCategory, 'Барлығы'>,
                  })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Бағасы (теңгемен) <span className="text-rose-700">*</span>
              </label>
              <input
                type="number"
                min="100"
                step="50"
                value={formData.price ?? ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className={`w-full px-3 py-2 bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800 ${
                  errors.price ? 'border-red-400' : 'border-stone-300'
                }`}
              />
              {errors.price && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Ескі бағасы (жеңілдік үшін)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                placeholder="Егер жеңілдік болса"
                value={formData.originalPrice ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originalPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
              />
            </div>
          </div>

          {/* Cover image or color theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Мұқаба суретінің URL сілтемесі (қосымша)
              </label>
              <input
                type="url"
                placeholder="https://... немесе бос қалдырыңыз"
                value={formData.coverUrl || ''}
                onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Бос қалса, сәнді былғары мұқаба автоматты түрде жасалады
              </span>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Авто-мұқаба түсі (егер сурет болмаса)
              </label>
              <select
                value={formData.coverColorTheme || 'crimson'}
                onChange={(e) => setFormData({ ...formData, coverColorTheme: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
              >
                <option value="crimson">Малиновый (Қызылкүрең)</option>
                <option value="navy">Көк (Мұхит түсті)</option>
                <option value="emerald">Изумруд (Жасыл)</option>
                <option value="amber">Янтарь (Қоңыр-сары)</option>
                <option value="gold">Алтын (Қара-алтын)</option>
              </select>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Қысқаша сипаттамасы (карточка үшін) <span className="text-rose-700">*</span>
            </label>
            <input
              type="text"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="1-2 сөйлемнен тұратын түйіндеме"
              className={`w-full px-3 py-2 bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800 ${
                errors.description ? 'border-red-400' : 'border-stone-300'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Толық сипаттамасы (жеке бетке арналған)
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription || ''}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Кітаптың мазмұны, тақырыбы мен оқырманға берер пайдасы..."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
            />
          </div>

          {/* Specs: Pages, Year, Binding, Publisher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-stone-600 mb-1">Бет саны</label>
              <input
                type="number"
                value={formData.pages || 200}
                onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Жылы</label>
              <input
                type="number"
                value={formData.year || 2024}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Мұқабасы</label>
              <select
                value={formData.binding}
                onChange={(e) =>
                  setFormData({ ...formData, binding: e.target.value as 'Қатты мұқаба' | 'Жұмсақ мұқаба' })
                }
                className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 rounded-lg"
              >
                <option value="Қатты мұқаба">Қатты мұқаба</option>
                <option value="Жұмсақ мұқаба">Жұмсақ мұқаба</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Баспасы</label>
              <input
                type="text"
                value={formData.publisher || ''}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg"
              />
            </div>
          </div>

          {/* Checkboxes: isNew, isPopular, isSpecialOffer, isRecommended */}
          <div className="pt-2 border-t border-stone-200">
            <label className="block text-stone-700 font-semibold mb-2">
              Айдарлар мен бөлімдерде көрсету:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isNew)}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="rounded text-rose-800 focus:ring-rose-800"
                />
                <span>Айдың жаңалығы</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isPopular)}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="rounded text-rose-800 focus:ring-rose-800"
                />
                <span>Танымал кітап</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isSpecialOffer)}
                  onChange={(e) => setFormData({ ...formData, isSpecialOffer: e.target.checked })}
                  className="rounded text-rose-800 focus:ring-rose-800"
                />
                <span>Жеңілдіктер</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isRecommended)}
                  onChange={(e) => setFormData({ ...formData, isRecommended: e.target.checked })}
                  className="rounded text-rose-800 focus:ring-rose-800"
                />
                <span>Ұсынылатын</span>
              </label>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-4 flex items-center justify-between gap-3">
            {onResetDefaults ? (
              <button
                type="button"
                onClick={onResetDefaults}
                className="py-2.5 px-3 text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1.5 transition-colors"
                title="Бастапқы 16 кітапты қалпына келтіру"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Бастапқы күйге қайтару
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium transition-colors"
              >
                Болдырмау
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 bg-rose-800 hover:bg-rose-900 text-white rounded-xl font-semibold shadow-md flex items-center gap-1.5 transition-colors"
              >
                {book ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {book ? 'Өзгерістерді сақтау' : 'Кітапты қосу'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
