import { Book, BookCategory, CartItem } from '../types/book';

export const ATYRAU_STORE_PHONE = '77079801234';
export const ATYRAU_STORE_INSTAGRAM = 'kitapal.atyrau';
export const ATYRAU_STORE_ADDRESS = 'Атырау қаласы, Мұса Баймұханов, 1';
export const ATYRAU_STORE_HOURS = 'Дүйсенбі — Жексенбі: 10:00 – 20:30';

/**
 * Formats a number to Kazakhstani Tenge representation (e.g. 3 500 ₸)
 */
export function formatPrice(price: number): string {
  const rounded = Math.round(price);
  return `${rounded.toLocaleString('ru-RU')} ₸`;
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface FilterOptions {
  category?: BookCategory;
  query?: string;
  sortBy?: SortOption;
  tag?: 'all' | 'new' | 'popular' | 'discount' | 'recommended';
}

/**
 * Filter, search, and sort books deterministically
 */
export function filterBooks(books: Book[], options: FilterOptions): Book[] {
  let result = [...books];

  // 1. Category filter
  if (options.category && options.category !== 'Барлығы') {
    result = result.filter((b) => b.category === options.category);
  }

  // 2. Curated Tag filter
  if (options.tag && options.tag !== 'all') {
    if (options.tag === 'new') {
      result = result.filter((b) => b.isNew);
    } else if (options.tag === 'popular') {
      result = result.filter((b) => b.isPopular);
    } else if (options.tag === 'discount') {
      result = result.filter((b) => Boolean(b.isSpecialOffer || (b.originalPrice && b.originalPrice > b.price)));
    } else if (options.tag === 'recommended') {
      result = result.filter((b) => b.isRecommended);
    }
  }

  // 3. Search query (searches title, author, description, category, publisher)
  if (options.query && options.query.trim().length > 0) {
    const q = options.query.trim().toLowerCase();
    result = result.filter((b) => {
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (b.publisher && b.publisher.toLowerCase().includes(q))
      );
    });
  }

  // 4. Sort
  const sortBy = options.sortBy || 'popular';
  result.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.year - a.year || (b.isNew ? -1 : 1);
      case 'popular':
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviewsCount - a.reviewsCount;
    }
  });

  return result;
}

/**
 * Calculates cart subtotal, discount, final amount, item count
 */
export function calculateCartTotals(items: CartItem[]): {
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  totalItems: number;
} {
  let subtotal = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  for (const item of items) {
    const qty = item.quantity;
    totalItems += qty;
    const basePrice = item.book.originalPrice ?? item.book.price;
    subtotal += basePrice * qty;

    const discountPerItem = Math.max(0, basePrice - item.book.price);
    totalDiscount += discountPerItem * qty;
  }

  const finalTotal = subtotal - totalDiscount;

  return {
    subtotal,
    totalDiscount,
    finalTotal,
    totalItems,
  };
}

export interface WhatsAppOrderParams {
  book?: Book;
  items?: CartItem[];
  customerName?: string;
  phone?: string;
  address?: string;
  deliveryType?: 'pickup' | 'delivery';
  note?: string;
}

/**
 * Formats a clean, courteous WhatsApp order message in Kazakh and produces a wa.me URL
 */
export function generateWhatsAppOrderUrl(params: WhatsAppOrderParams): string {
  const lines: string[] = [];

  lines.push('Сәлеметсіз бе, Kitapal Atyrau!');
  lines.push('Мен дүкеніңізден мына кітап(тар)қа тапсырыс бергім келеді:');
  lines.push('');

  if (params.book) {
    lines.push(`📚 *${params.book.title}*`);
    lines.push(`✍️ Авторы: ${params.book.author}`);
    lines.push(`💰 Бағасы: ${formatPrice(params.book.price)}`);
    if (params.book.originalPrice && params.book.originalPrice > params.book.price) {
      lines.push(`🏷 Жеңілдікпен (бұрынғы бағасы: ${formatPrice(params.book.originalPrice)})`);
    }
    lines.push(`📖 Категориясы: ${params.book.category}`);
  } else if (params.items && params.items.length > 0) {
    params.items.forEach((item, index) => {
      lines.push(
        `${index + 1}. *${item.book.title}* (${item.book.author}) — ${item.quantity} дана × ${formatPrice(item.book.price)} = ${formatPrice(item.book.price * item.quantity)}`
      );
    });

    const totals = calculateCartTotals(params.items);
    lines.push('');
    lines.push(`💵 Барлығы: *${formatPrice(totals.finalTotal)}* (${totals.totalItems} кітап)`);
  }

  lines.push('');
  if (params.deliveryType) {
    const deliveryLabel = params.deliveryType === 'delivery' ? 'Атырау бойынша жеткізу (курьер)' : 'Дүкеннен алып кету (Мұса Баймұханов, 1)';
    lines.push(`🚚 Жеткізу түрі: ${deliveryLabel}`);
  }

  if (params.customerName && params.customerName.trim()) {
    lines.push(`👤 Аты-жөні: ${params.customerName.trim()}`);
  }

  if (params.phone && params.phone.trim()) {
    lines.push(`📱 Байланыс тел: ${params.phone.trim()}`);
  }

  if (params.address && params.address.trim()) {
    lines.push(`📍 Мекенжайы: ${params.address.trim()}`);
  }

  if (params.note && params.note.trim()) {
    lines.push(`💬 Қосымша тілек: ${params.note.trim()}`);
  }

  lines.push('');
  lines.push('Тапсырысты растап, төлем мен жеткізу уақытын хабарлауыңызды сұраймын. Рақмет!');

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${ATYRAU_STORE_PHONE}?text=${text}`;
}

/**
 * Validate book data for add/edit operations
 */
export function validateBook(book: Partial<Book>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!book.title || book.title.trim().length === 0) {
    errors.title = 'Кітап атауын енгізіңіз';
  }

  if (!book.author || book.author.trim().length === 0) {
    errors.author = 'Автордың аты-жөнін енгізіңіз';
  }

  if (book.price === undefined || book.price === null || isNaN(book.price) || book.price <= 0) {
    errors.price = 'Бағасын дұрыс енгізіңіз (0-ден жоғары)';
  }

  if (!book.category) {
    errors.category = 'Категорияны таңдаңыз';
  }

  if (!book.description || book.description.trim().length < 5) {
    errors.description = 'Қысқаша сипаттамасын енгізіңіз (кемінде 5 таңба)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
