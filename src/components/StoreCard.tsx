import { motion } from 'framer-motion';
import { Store } from '@/lib/data/stores';
import { Link } from '@tanstack/react-router';
import { Star, Clock, Truck } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link to="/stores/$storeId" params={{ storeId: store.id }}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-card hover:shadow-float transition-shadow cursor-pointer"
      >
        <div className="relative overflow-hidden h-40">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <h3 className="font-display font-bold text-white mb-1">{store.name}</h3>
            <div className="flex items-center gap-2 text-white text-xs">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{store.rating}</span>
              <span className="text-gray-200">({store.reviews} отзывов)</span>
            </div>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{store.deliveryTime} мин</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Truck className="w-4 h-4" />
              <span>{store.deliveryFee} ₸</span>
            </div>
            <div className="text-right text-gray-600 dark:text-gray-400">
              От {store.minOrder} ₸
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {store.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
