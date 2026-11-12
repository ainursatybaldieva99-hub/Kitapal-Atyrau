import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPrice,
  filterBooks,
  calculateCartTotals,
  generateWhatsAppOrderUrl,
  validateBook,
} from './bookStoreLogic';
import { Book } from '../types/book';

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Абай жолы',
    author: 'Мұхтар Әуезов',
    category: 'Қазақ әдебиеті',
    price: 4500,
    originalPrice: 5000,
    description: 'Қазақ халқының өмірін бейнелейтін эпопея',
    fullDescription: 'Мұхтар Әуезовтің әлемге әйгілі төрт томдық роман-эпопеясы.',
    isNew: false,
    isPopular: true,
    isSpecialOffer: true,
    isRecommended: true,
    rating: 4.9,
    reviewsCount: 142,
    pages: 680,
    year: 2023,
    binding: 'Қатты мұқаба',
    language: 'Қазақша',
    publisher: 'Жазушы',
    isbn: '978-601-01-1234-5',
    inStock: true,
  },
  {
    id: '2',
    title: 'Атомдық әдеттер',
    author: 'Джеймс Клир',
    category: 'Психология және өзін-өзі дамыту',
    price: 3800,
    description: 'Күнделікті 1% жақсарудың орасан күші',
    fullDescription: 'Әдеттерді қалыптастыру бойынша дүниежүзілік бестселлер.',
    isNew: true,
    isPopular: true,
    isSpecialOffer: false,
    isRecommended: true,
    rating: 4.8,
    reviewsCount: 98,
    pages: 320,
    year: 2024,
    binding: 'Жұмсақ мұқаба',
    language: 'Қазақша',
    publisher: 'Mazhab',
    isbn: '978-601-02-5678-9',
    inStock: true,
  },
  {
    id: '3',
    title: 'Кішкентай ханзада',
    author: 'Антуан де Сент-Экзюпери',
    category: 'Балалар әдебиеті',
    price: 2400,
    description: 'Жүрекпен ғана анық көруге болады',
    fullDescription: 'Балалар мен үлкендерге арналған даналыққа толы ертегі.',
    isNew: false,
    isPopular: false,
    isSpecialOffer: false,
    isRecommended: true,
    rating: 5.0,
    reviewsCount: 45,
    pages: 128,
    year: 2022,
    binding: 'Қатты мұқаба',
    language: 'Қазақша',
    publisher: 'Фолиант',
    isbn: '978-601-03-9999-1',
    inStock: true,
  },
];

test('formatPrice formats tenge values properly', () => {
  assert.equal(formatPrice(3500).includes('3 500') || formatPrice(3500).includes('3500') || formatPrice(3500).includes('₸'), true);
  assert.equal(formatPrice(3500).endsWith('₸'), true);
});

test('filterBooks filters by category correctly', () => {
  const kazakhBooks = filterBooks(sampleBooks, { category: 'Қазақ әдебиеті' });
  assert.equal(kazakhBooks.length, 1);
  assert.equal(kazakhBooks[0].title, 'Абай жолы');

  const allBooks = filterBooks(sampleBooks, { category: 'Барлығы' });
  assert.equal(allBooks.length, 3);
});

test('filterBooks searches query across title, author and description', () => {
  const querySearch = filterBooks(sampleBooks, { query: 'клир' });
  assert.equal(querySearch.length, 1);
  assert.equal(querySearch[0].author, 'Джеймс Клир');

  const descSearch = filterBooks(sampleBooks, { query: 'жүрекпен' });
  assert.equal(descSearch.length, 1);
  assert.equal(descSearch[0].title, 'Кішкентай ханзада');
});

test('filterBooks sorts by price ascending and descending', () => {
  const asc = filterBooks(sampleBooks, { sortBy: 'price-asc' });
  assert.equal(asc[0].price, 2400);
  assert.equal(asc[2].price, 4500);

  const desc = filterBooks(sampleBooks, { sortBy: 'price-desc' });
  assert.equal(desc[0].price, 4500);
  assert.equal(desc[2].price, 2400);
});

test('calculateCartTotals calculates discounts and final amounts', () => {
  const cartItems = [
    { book: sampleBooks[0], quantity: 2 }, // 4500 (orig 5000) * 2 = 9000 (orig 10000, discount 1000)
    { book: sampleBooks[1], quantity: 1 }, // 3800 * 1 = 3800
  ];

  const totals = calculateCartTotals(cartItems);
  assert.equal(totals.totalItems, 3);
  assert.equal(totals.subtotal, 13800);
  assert.equal(totals.totalDiscount, 1000);
  assert.equal(totals.finalTotal, 12800);
});

test('generateWhatsAppOrderUrl contains book info and Atyrau phone', () => {
  const url = generateWhatsAppOrderUrl({
    book: sampleBooks[0],
    customerName: 'Айгүл',
    address: 'Мұса Баймұханов, 1',
  });

  assert.equal(url.includes('77079801234'), true);
  assert.equal(url.includes(encodeURIComponent('Абай жолы')), true);
  assert.equal(url.includes(encodeURIComponent('Айгүл')), true);
});

test('validateBook validates required fields', () => {
  const invalid = validateBook({ title: '', author: '' });
  assert.equal(invalid.valid, false);
  assert.equal(Boolean(invalid.errors.title), true);
  assert.equal(Boolean(invalid.errors.author), true);

  const valid = validateBook({
    title: 'Ұшқан ұя',
    author: 'Бауыржан Момышұлы',
    category: 'Қазақ әдебиеті',
    price: 3200,
    description: 'Жазушының балалық шағы туралы шығармасы',
  });
  assert.equal(valid.valid, true);
});
