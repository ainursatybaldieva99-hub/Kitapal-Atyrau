import React from 'react';
import { Book } from '../types/book';
import { BookCover } from './BookCover';
import { formatPrice } from '../utils/bookStoreLogic';
import { ShoppingBag, Star, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onEdit?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onSelect, onAddToCart, onEdit }) => {
  const hasDiscount = Boolean(book.originalPrice && book.originalPrice > book.price);
  const discountPercent = hasDiscount
    ? Math.round(((book.originalPrice! - book.price) / book.originalPrice!) * 100)
    : 0;

  return (
    <article className="group bg-white rounded-xl border border-stone-200/80 p-4 transition-all duration-300 hover:shadow-xl hover:border-rose-200 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Cover with tag badges if applicable */}
        <div className="relative mb-4 cursor-pointer" onClick={() => onSelect(book)}>
          <BookCover book={book} size="md" />

          {/* Clean metadata badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-rose-800 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
              -{discountPercent}%
            </div>
          )}

          {book.isNew && !hasDiscount && (
            <div className="absolute top-2 right-2 bg-stone-900 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-sm">
              Жаңа
            </div>
          )}

          {/* Hover view overlay button */}
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
            <span className="bg-white text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-rose-700" />
              Толығырақ көру
            </span>
          </div>
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <span className="font-medium text-rose-800 line-clamp-1">{book.category}</span>
          <div className="flex items-center gap-1 text-stone-700 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{book.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(book)}
          className="font-editorial text-base sm:text-lg font-semibold text-stone-900 hover:text-rose-800 transition-colors cursor-pointer line-clamp-2 leading-tight mb-1"
        >
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-stone-600 font-medium mb-2 line-clamp-1">{book.author}</p>

        {/* Short description */}
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
          {book.description}
        </p>
      </div>

      <div>
        {/* Price Row */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-stone-900 tabular-nums">
              {formatPrice(book.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(book.originalPrice!)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-stone-500">{book.binding}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSelect(book)}
            aria-label={`«${book.title}» туралы толығырақ`}
            data-testid={`detail-btn-${book.id}`}
            className="w-full py-2 px-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-center"
          >
            Толығырақ
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(book)}
            aria-label={`«${book.title}» кітабын себетке қосу`}
            data-testid={`add-to-cart-btn-${book.id}`}
            className="w-full py-2 px-2 text-xs font-semibold text-white bg-rose-800 hover:bg-rose-900 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Себетке
          </button>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(book)}
            aria-label={`«${book.title}» кітабын өңдеу`}
            data-testid={`edit-btn-${book.id}`}
            className="w-full mt-2 text-[11px] text-stone-400 hover:text-rose-700 transition-colors text-center"
          >
            ✏️ Деректерін өңдеу
          </button>
        )}
      </div>
    </article>
  );
};
