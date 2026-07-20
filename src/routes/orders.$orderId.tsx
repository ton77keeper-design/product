import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { useAppStore } from '@/lib/store';
import { formatKzt, formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Rating } from '@/components/Rating';

export const Route = createFileRoute('/orders/$orderId')({ 
  component: OrderDetailsPage,
});

function OrderDetailsPage() {
  const { orderId } = Route.useParams();
  const { getOrder, addReview, addNotification } = useAppStore();
  const order = getOrder(orderId);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  if (!order) {
    return (
      <AppShell>
        <div className="text-center py-12">Заказ не найден</div>
      </AppShell>
    );
  }

  const handleSubmitReview = () => {
    if (rating > 0) {
      addReview({
        storeId: order.storeId,
        rating,
        text: review,
      });
      addNotification({
        type: 'system',
        title: 'Спасибо!',
        message: 'Ваш отзыв был добавлен',
      });
      setRating(0);
      setReview('');
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <Link to="/orders">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-green-600" />
          </Link>
          <h1 className="text-2xl font-bold">Заказ #{order.id.slice(0, 8)}</h1>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6"
        >
          <div className="space-y-3">
            {[
              { status: 'new', label: 'Заказ принят' },
              { status: 'accepted', label: 'Магазин подтвердил' },
              { status: 'picking', label: 'Комплектуется' },
              { status: 'delivering', label: 'В доставке' },
              { status: 'delivered', label: 'Доставлено' },
            ].map((step, idx) => {
              const isCompleted = ['new', 'accepted', 'picking', 'delivering', 'delivered'].indexOf(step.status) <= ['new', 'accepted', 'picking', 'delivering', 'delivered'].indexOf(order.status as any);
              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {idx + 1}
                    </div>
                    {idx < 4 && (
                      <div className={`w-0.5 h-12 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className={`font-medium ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6"
        >
          <h2 className="font-semibold mb-4">Товары в заказе</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
                <p className="font-semibold">{formatKzt(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6"
        >
          <h2 className="font-semibold mb-4">Адрес доставки</h2>
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 dark:text-gray-300">{order.address}</p>
          </div>
        </motion.div>

        {/* Totals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6"
        >
          <div className="flex justify-between mb-2">
            <span>Сумма товаров</span>
            <span>{formatKzt(order.total * 0.9)}</span>
          </div>
          <div className="flex justify-between mb-2 text-green-600">
            <span>Кэшбэк 5%</span>
            <span>+{formatKzt(order.total * 0.05)}</span>
          </div>
          <div className="border-t border-green-200 dark:border-green-800 pt-2 flex justify-between font-bold text-lg">
            <span>К оплате</span>
            <span>{formatKzt(order.total)}</span>
          </div>
        </motion.div>

        {/* Review Section */}
        {order.status === 'delivered' && !order.rating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4"
          >
            <h2 className="font-semibold mb-4">Оставить отзыв</h2>
            <div className="mb-4">
              <Rating rating={rating} reviews={0} onRate={setRating} interactive />
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Расскажите о вашем опыте..."
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 resize-none mb-4"
              rows={3}
            />
            <button
              onClick={handleSubmitReview}
              disabled={rating === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Отправить отзыв
            </button>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
