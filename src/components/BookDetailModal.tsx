import React, { useState } from 'react';
import { Book } from '../types/book';
import { BookCover } from './BookCover';
import { formatPrice, generateWhatsAppOrderUrl } from '../utils/bookStoreLogic';
import { X, Star, ShoppingBag, Send, CheckCircle2, MapPin, Truck, ShieldCheck, Edit3 } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  onEditBook?: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToCart,
  onEditBook,
}) => {
  const [fastOrderOpen, setFastOrderOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  if (!book) return null;

  const hasDiscount = Boolean(book.originalPrice && book.originalPrice > book.price);
  const discountSavings = hasDiscount ? book.originalPrice! - book.price : 0;

  const handleAddToCart = () => {
    onAddToCart(book);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleDirectWhatsApp = () => {
    const url = generateWhatsAppOrderUrl({ book });
    window.open(url, '_blank');
  };

  const handleCustomizedWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppOrderUrl({
      book,
      customerName,
      phone: customerPhone,
      address: customerAddress,
      deliveryType: customerAddress.trim() ? 'delivery' : 'pickup',
    });
    window.open(url, '_blank');
    setFastOrderOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Жабу"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Book Cover & Stock */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[260px] mx-auto mb-4">
              <BookCover book={book} size="lg" />
            </div>

            {/* In stock badge in Atyrau */}
            <div className="w-full bg-emerald-50 border border-emerald-200/80 rounded-lg p-3 text-emerald-900 text-xs flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Атырау дүкенінде бар</strong> (Мұса Баймұханов, 1)
              </span>
            </div>

            {onEditBook && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditBook(book);
                }}
                className="text-xs text-rose-800 hover:text-rose-900 flex items-center gap-1 font-medium transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Кітап мәліметтерін өңдеу
              </button>
            )}
          </div>

          {/* Right Column: Book Info & Purchase */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-rose-800">{book.category}</span>
                <span aria-hidden="true">·</span>
                <span>{book.binding}</span>
                <span aria-hidden="true">·</span>
                <span>{book.year} жыл</span>
              </div>

              {/* Title & Author */}
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mb-2">
                {book.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-700 font-medium mb-3">
                Авторы: <span className="text-stone-900">{book.author}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-900">{book.rating.toFixed(1)}</span>
                <span className="text-xs text-stone-500">({book.reviewsCount} оқырман пікірі)</span>
              </div>

              {/* Pricing section */}
              <div className="bg-stone-50 rounded-xl p-4 mb-5 border border-stone-200/60">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                    {formatPrice(book.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      {formatPrice(book.originalPrice!)}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="text-xs font-semibold bg-rose-800 text-white px-2 py-0.5 rounded">
                      Үнемдеу: {formatPrice(discountSavings)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500">
                  Қолма-қол, Kaspi Gold, Kaspi Red немесе QR арқылы төлеуге болады
                </p>
              </div>

              {/* Specs table */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-5 bg-white border border-stone-100 rounded-lg p-3">
                <div>
                  <span className="text-stone-400">Тілі:</span>{' '}
                  <span className="font-medium text-stone-800">{book.language}</span>
                </div>
                <div>
                  <span className="text-stone-400">Бет саны:</span>{' '}
                  <span className="font-medium text-stone-800">{book.pages} бет</span>
                </div>
                <div>
                  <span className="text-stone-400">Баспасы:</span>{' '}
                  <span className="font-medium text-stone-800">{book.publisher}</span>
                </div>
                <div>
                  <span className="text-stone-400">ISBN:</span>{' '}
                  <span className="font-medium text-stone-800 font-mono text-[11px]">{book.isbn}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Кітап туралы
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {book.fullDescription || book.description}
                </p>
              </div>
            </div>

            {/* CTAs and WhatsApp Section */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              {/* WhatsApp direct order button */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  WhatsApp арқылы тапсырыс беру
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3 px-5 bg-rose-800 hover:bg-rose-900 text-white rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedToast ? 'Қосылды! ✓' : 'Себетке салу'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setFastOrderOpen(!fastOrderOpen)}
                className="text-xs text-stone-600 hover:text-stone-900 font-medium underline block text-center w-full transition-colors"
              >
                {fastOrderOpen ? 'Форманы жабу' : 'Жеткізу мекенжайымен бірге WhatsApp арқылы тапсырыс беру ▾'}
              </button>

              {/* Fast customized order form */}
              {fastOrderOpen && (
                <form
                  onSubmit={handleCustomizedWhatsAppOrder}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-4 mt-2 space-y-3"
                >
                  <p className="text-xs font-semibold text-stone-800">
                    Тапсырыс беруші деректері (WhatsApp хабарламасына автоматты түрде қосылады):
                  </p>
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-1">Сіздің атыңыз</label>
                    <input
                      type="text"
                      required
                      placeholder="Мысалы: Айгүл"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">Телефон нөмірі</label>
                      <input
                        type="tel"
                        placeholder="+7 (707) 000-00-00"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">
                        Атыраудағы мекенжай (курьер үшін)
                      </label>
                      <input
                        type="text"
                        placeholder="Авангард, 3-мкр, 15-үй"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Тапсырысты WhatsApp-қа жіберу
                  </button>
                </form>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-stone-500 text-center border-t border-stone-100">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-stone-700 mb-1" />
                  <span>Атырау бойынша күнделікті жеткізу</span>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-4 h-4 text-stone-700 mb-1" />
                  <span>Баймұханов 1-ден тегін алып кету</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-stone-700 mb-1" />
                  <span>100% түпнұсқа сапа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
