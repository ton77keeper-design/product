import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { products } from '@/lib/data/stores';
import { ProductCard } from '@/components/ProductCard';
import { useAppStore } from '@/lib/store';
import { formatKzt } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Truck } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { Rating } from '@/components/Rating';

export const Route = createFileRoute('/stores/$storeId')({ 
  component: StoreDetailPage,
});

function StoreDetailPage() {
  const { storeId } = useParams({ from: Route.id });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart, addNotification, getStoreReviews } = useAppStore();

  const storeProducts = products[storeId] || [];
  const reviews = getStoreReviews(storeId);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
    : 4.8;

  const handleAddToCart = (productId: string) => {
    const product = storeProducts.find((p) => p.id === productId);
    if (product) {
      addToCart({
        id: productId,
        storeId,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      addNotification({
        type: 'order',
        title: 'Добавлено в корзину',
        message: product.name,
      });
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 bg-gradient-to-b from-gray-200 to-white dark:from-gray-700 dark:to-gray-900"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          </Link>

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-4 pb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
              >
                <h1 className="text-2xl font-bold mb-2">Магазин #{storeId}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <Rating rating={avgRating} reviews={reviews.length} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>25 мин</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Truck className="w-4 h-4" />
                    <span>500 ₸</span>
                  </div>
                  <div className="text-right text-gray-600 dark:text-gray-400">
                    От 2000 ₸
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="px-4 py-6">
          {/* Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">Товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {storeProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image={product.image}
                    rating={product.rating}
                    reviews={product.reviews}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold mb-4">Отзывы ({reviews.length})</h2>
              <div className="space-y-3">
                {reviews.slice(0, 5).map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Rating rating={review.rating} reviews={0} />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
