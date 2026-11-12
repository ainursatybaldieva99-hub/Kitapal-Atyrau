import React, { useState, useEffect } from 'react';
import { Book, CartItem } from './types/book';
import { INITIAL_BOOKS } from './data/initialBooks';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { CuratedSections } from './components/CuratedSections';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { BookEditorModal } from './components/BookEditorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY_BOOKS = 'kitapal_atyrau_books_v1';
const STORAGE_KEY_CART = 'kitapal_atyrau_cart_v1';

export default function App() {
  // Books state initialized from localStorage or default dataset
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_BOOKS;
  });

  // Shopping cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Modals & Drawers
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync books to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
    } catch {
      // Ignore quota errors
    }
  }, [books]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (book: Book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    showToast(`«${book.title}» себетке қосылды!`);
  };

  const handleUpdateCartQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.book.id === bookId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Book Editor operations
  const handleOpenAddBook = () => {
    setEditingBook(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditBook = (book: Book) => {
    setEditingBook(book);
    setIsEditorOpen(true);
  };

  const handleSaveBook = (savedBook: Book) => {
    setBooks((prev) => {
      const index = prev.findIndex((b) => b.id === savedBook.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = savedBook;
        return next;
      }
      return [savedBook, ...prev];
    });

    if (selectedBook && selectedBook.id === savedBook.id) {
      setSelectedBook(savedBook);
    }

    showToast(`«${savedBook.title}» сәтті сақталды!`);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Каталогты бастапқы 16 кітапқа қайтарғыңыз келе ме?')) {
      setBooks(INITIAL_BOOKS);
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(INITIAL_BOOKS));
      setIsEditorOpen(false);
      showToast('Бастапқы каталог қалпына келтірілді!');
    }
  };

  // Navigation smoothly scrolls to section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans-clean selection:bg-rose-900 selection:text-white">
      {/* Top Banner for store announcement */}
      <aside aria-label="Хабарландыру" className="bg-rose-950 text-rose-100 text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-rose-900/60">
        <span className="font-semibold text-white">Kitapal Atyrau:</span> Атырау қаласы бойынша бүгін
        тапсырыс берсеңіз — 10 000 ₸ жоғары жеткізу тегін!
      </aside>

      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAddBook={handleOpenAddBook}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreCatalog={() => handleNavigate('catalog')}
          onJoinClub={() => handleNavigate('projects')}
        />

        {/* 2. Curated Highlights (New Releases, Popular, Discounts, Recommended) */}
        <CuratedSections
          books={books}
          onSelectBook={(b) => setSelectedBook(b)}
          onAddToCart={handleAddToCart}
          onViewAllCatalog={() => handleNavigate('catalog')}
        />

        {/* 3. Catalog Section with 6 Categories & Search */}
        <CatalogSection
          books={books}
          onSelectBook={(b) => setSelectedBook(b)}
          onAddToCart={handleAddToCart}
          onOpenAddBook={handleOpenAddBook}
          onEditBook={handleOpenEditBook}
        />

        {/* 4. About Store & Mission */}
        <AboutSection />

        {/* 5. Our Social & Cultural Projects */}
        <ProjectsSection />

        {/* 6. Contacts & Location in Atyrau */}
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        onEditBook={handleOpenEditBook}
      />

      {/* Book Editor / Adder Modal */}
      <BookEditorModal
        book={editingBook}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveBook}
        onResetDefaults={handleResetCatalog}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-stone-800 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
