import { createFileRoute, Link } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { useAppStore, CartItem } from '@/lib/store';
import { formatKzt } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/cart')({ 
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal, addNotification } = useAppStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const total = getCartTotal();
  const delivery = total > 0 ? 500 : 0;
  const minOrder = 2000;
  const canCheckout = total >= minOrder;
  const cashback = Math.round(total * 0.05);

  const handleApplyPromo = () => {
    if (promoCode === 'WELCOME10') {
      setDiscount(Math.round(total * 0.1));
      addNotification({
        type: 'promo',
        title: 'Промокод применен!',
        message: 'Скидка 10% на заказ',
      });
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6 flex items-center gap-2"
        >
          <ShoppingCart className="w-6 h-6" />
          Корзина
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">Ваша корзина пуста</p>
            <Link
              to="/"
              className="text-green-600 hover:underline font-medium"
            >
              Вернуться к магазинам
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 flex gap-4"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold mb-2">{item.name}</p>
                    <p className="text-green-600 font-bold">{formatKzt(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 h-fit sticky top-4"
            >
              <h2 className="font-semibold mb-4">Итого</h2>
              
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span>Товары</span>
                  <span>{formatKzt(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Доставка</span>
                  <span>{formatKzt(delivery)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Скидка</span>
                    <span>-{formatKzt(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between font-bold text-lg mb-4">
                <span>К оплате</span>
                <span>{formatKzt(total + delivery - discount)}</span>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 mb-4 text-xs text-green-700 dark:text-green-400">
                ✨ Кэшбэк {cashback} ₸ вернется на счет
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm mb-2 dark:bg-gray-700"
                />
                <button
                  onClick={handleApplyPromo}
                  className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm py-1 rounded transition-colors"
                >
                  Применить
                </button>
                <p className="text-xs text-gray-500 mt-1">Попробуйте: WELCOME10</p>
              </div>

              {!canCheckout && (
                <p className="text-xs text-red-600 mb-4 text-center">
                  Минимум {formatKzt(minOrder)}
                </p>
              )}

              <motion.button
                whileHover={{ scale: canCheckout ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                disabled={!canCheckout}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Оформить заказ
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
