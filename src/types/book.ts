export type BookCategory =
  | 'Барлығы'
  | 'Қазақ әдебиеті'
  | 'Әлем әдебиеті'
  | 'Діни әдебиет'
  | 'Балалар әдебиеті'
  | 'Психология және өзін-өзі дамыту'
  | 'Тарих және таным';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Exclude<BookCategory, 'Барлығы'>;
  price: number;
  originalPrice?: number;
  coverUrl?: string;
  coverColorTheme?: string; // fallback stylized color theme (e.g. 'crimson', 'emerald', 'amber', 'indigo', 'slate')
  description: string;
  fullDescription: string;
  isNew?: boolean;
  isPopular?: boolean;
  isSpecialOffer?: boolean;
  isRecommended?: boolean;
  rating: number;
  reviewsCount: number;
  pages: number;
  year: number;
  binding: 'Қатты мұқаба' | 'Жұмсақ мұқаба';
  language: 'Қазақша' | 'Орысша' | 'Ағылшынша';
  publisher: string;
  isbn: string;
  inStock: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullStory: string;
  stats?: string;
  imageUrl?: string;
  statusText: string;
  actionText: string;
}
