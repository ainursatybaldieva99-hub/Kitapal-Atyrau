import React, { useState } from 'react';
import { CartItem } from '../types/book';
import { BookCover } from './BookCover';
import {
  formatPrice,
  calculateCartTotals,
  generateWhatsAppOrderUrl,
  ATYRAU_STORE_ADDRESS,
} from '../utils/bookStoreLogic';
import { X, Plus, Minus, Trash2, Send, ShoppingBag, Truck, MapPin } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const url = generateWhatsAppOrderUrl({
      items,
      customerName,
      phone: customerPhone,
      deliveryType,
      address: deliveryType === 'delivery' ? customerAddress : ATYRAU_STORE_ADDRESS,
      note: orderNote,
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm flex justify-end">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-800" />
            <h2 className="font-editorial text-lg font-bold text-stone-900">
              Себет ({totals.totalItems} кітап)
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Жабу"
            className="p-1.5 text-stone-400 hover:text-stone-700 bg-white border border-stone-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 text-stone-300" />
              <p className="font-editorial text-lg text-stone-700 font-semibold mb-1">
                Себет әзірге бос
              </p>
              <p className="text-xs text-stone-500 mb-4 max-w-xs">
                Каталогтан өзіңізге ұнаған тамаша кітаптарды таңдап, себетке қосыңыз.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-5 bg-rose-800 text-white text-xs font-semibold rounded-lg hover:bg-rose-900 transition-colors"
              >
                Кітаптарды көру
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ book, quantity }) => (
                <div
                  key={book.id}
                  className="flex gap-3 p-3 bg-stone-50/80 rounded-xl border border-stone-200/70 items-center justify-between"
                >
                  <div className="w-12 h-18 shrink-0">
                    <BookCover book={book} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-semibold text-stone-900 truncate">{book.title}</h4>
                    <p className="text-[11px] text-stone-500 truncate">{book.author}</p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs font-bold text-stone-900 tabular-nums">
                        {formatPrice(book.price * quantity)}
                      </span>
                      {quantity > 1 && (
                        <span className="text-[10px] text-stone-400 tabular-nums">
                          ({formatPrice(book.price)} / дана)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(book.id)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      aria-label="Өшіру"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(book.id, quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900"
                        aria-label="Азайту"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(book.id, quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900"
                        aria-label="Көбейту"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right pt-1">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] text-stone-400 hover:text-red-600 transition-colors"
                >
                  Себетті тазарту
                </button>
              </div>

              {/* Order checkout form */}
              <form onSubmit={handleWhatsAppCheckout} className="pt-3 border-t border-stone-200 space-y-3">
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs space-y-2.5">
                  <span className="font-semibold text-stone-800 block">
                    Тапсырыс беруші деректері:
                  </span>

                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Аты-жөніңіз</label>
                    <input
                      type="text"
                      required
                      placeholder="Мысалы: Ерлан"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-rose-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Телефон нөмірі</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (707) 123-45-67"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-rose-800"
                    />
                  </div>

                  {/* Delivery type selector */}
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">Жеткізу тәсілі</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`p-2 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          deliveryType === 'delivery'
                            ? 'bg-rose-50 border-rose-800 text-rose-900 font-semibold'
                            : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Атырау (курьер)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType('pickup')}
                        className={`p-2 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          deliveryType === 'pickup'
                            ? 'bg-rose-50 border-rose-800 text-rose-900 font-semibold'
                            : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Өзім алып кетем
                      </button>
                    </div>
                  </div>

                  {deliveryType === 'delivery' ? (
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-0.5">
                        Атыраудағы мекенжайыңыз
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Көше, үй, пәтер"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-rose-800"
                      />
                    </div>
                  ) : (
                    <div className="text-[11px] text-stone-500 bg-white p-2 rounded border border-stone-200">
                      📍 Мекенжай: <strong>{ATYRAU_STORE_ADDRESS}</strong>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">
                      Қосымша тілек (қосымша)
                    </label>
                    <input
                      type="text"
                      placeholder="Мысалы: сыйлық қағазға орау"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-rose-800"
                    />
                  </div>
                </div>

                {/* Subtotals & Submit */}
                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex justify-between">
                    <span>Кітаптар сомасы:</span>
                    <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.totalDiscount > 0 && (
                    <div className="flex justify-between text-rose-800 font-medium">
                      <span>Жеңілдік:</span>
                      <span className="tabular-nums">-{formatPrice(totals.totalDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-stone-900 pt-1 border-t border-stone-200">
                    <span>Барлығы төлеуге:</span>
                    <span className="tabular-nums text-rose-900">{formatPrice(totals.finalTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  WhatsApp арқылы тапсырысты жіберу
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-500">
          Kaspi QR / Kaspi Red / Қолма-қол есеп айырысу
        </div>
      </div>
    </div>
  );
};
