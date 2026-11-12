import React from 'react';
import { Book } from '../types/book';

interface BookCoverProps {
  book: Book;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const THEME_STYLES: Record<string, { bg: string; border: string; accent: string; pattern: string }> = {
  crimson: {
    bg: 'from-rose-950 via-rose-900 to-rose-950',
    border: 'border-rose-400/30',
    accent: 'text-rose-200',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(244, 63, 94, 0.15), transparent 70%)',
  },
  navy: {
    bg: 'from-slate-950 via-sky-950 to-slate-900',
    border: 'border-sky-400/30',
    accent: 'text-sky-200',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.15), transparent 70%)',
  },
  emerald: {
    bg: 'from-emerald-950 via-teal-900 to-emerald-950',
    border: 'border-emerald-400/30',
    accent: 'text-emerald-200',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(52, 211, 153, 0.15), transparent 70%)',
  },
  amber: {
    bg: 'from-amber-950 via-yellow-950 to-amber-900',
    border: 'border-amber-400/30',
    accent: 'text-amber-200',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(251, 191, 36, 0.15), transparent 70%)',
  },
  gold: {
    bg: 'from-stone-900 via-stone-850 to-amber-950',
    border: 'border-amber-300/40',
    accent: 'text-amber-300',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.2), transparent 70%)',
  },
};

export const BookCover: React.FC<BookCoverProps> = ({ book, className = '', size = 'md' }) => {
  const theme = THEME_STYLES[book.coverColorTheme || 'crimson'] || THEME_STYLES.crimson;

  const sizeClasses = {
    sm: 'w-24 h-36 text-[10px]',
    md: 'w-full aspect-[3/4] text-xs',
    lg: 'w-full aspect-[3/4] max-w-sm text-sm',
  };

  return (
    <div
      className={`relative rounded-md overflow-hidden shadow-lg transition-transform duration-300 select-none group flex flex-col justify-between p-4 ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: '4px 6px 16px -2px rgba(0, 0, 0, 0.25), 1px 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* If book has an image URL and it loads successfully */}
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Styled Editorial Leather Cover with Book Spine */
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.bg} text-white flex flex-col justify-between p-4 z-0`}
        >
          {/* Background pattern layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ background: theme.pattern }}
          />

          {/* Spine 3D Crease Simulation on the left */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/60 via-white/10 to-transparent pointer-events-none z-10" />
          <div className="absolute left-3 top-0 bottom-0 w-px bg-black/40 pointer-events-none z-10" />

          {/* Golden/Crimson Embossed Border Ornament */}
          <div className={`absolute inset-2 border ${theme.border} rounded-sm pointer-events-none z-10`} />

          <div className="relative flex items-center justify-between text-[10px] tracking-wider uppercase font-semibold z-10 pt-1">
            <span className={`${theme.accent} tracking-widest`}>K I T A P A L</span>
            <span className="text-stone-300 text-[9px] line-clamp-1 max-w-[50%]">{book.category}</span>
          </div>

          {/* Book Title & Author in Center */}
          <div className="relative my-auto text-center z-10 px-1 py-2">
            <h4 className="font-editorial text-sm sm:text-base font-bold leading-tight tracking-wide text-white drop-shadow-md line-clamp-3">
              {book.title}
            </h4>
            <div className="w-10 h-0.5 bg-amber-400/60 mx-auto my-2 rounded-full" />
            <p className="text-xs text-stone-200 tracking-wide font-medium drop-shadow-sm line-clamp-1">
              {book.author}
            </p>
          </div>

          {/* Bottom Publisher / Quality Badge */}
          <div className="relative flex items-center justify-between text-[10px] text-stone-300 font-medium z-10 pb-0.5">
            <span className="text-stone-300 font-mono text-[9px]">{book.binding}</span>
            <span className="text-stone-300 tabular-nums">{book.year}</span>
          </div>

          {/* Subtle paper gloss highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none z-10" />
        </div>
      )}
    </div>
  );
};
