import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatKzt } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  rating,
  reviews,
  onAddToCart,
}: ProductCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  const isFav = isFavorite(id);
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-card hover:shadow-float transition-shadow"
    >
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{discount}%
          </div>
        )}
        <motion.button
          onClick={() => (isFav ? removeFavorite(id) : addFavorite(id))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 left-2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </motion.button>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{name}</h3>
        {rating && (
          <div className="flex items-center gap-1 mb-2 text-xs">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600 dark:text-gray-400">
              {rating.toFixed(1)} ({reviews})
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold text-green-600">{formatKzt(price)}</span>
          {oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatKzt(oldPrice)}
            </span>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart?.(id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          В корзину
        </motion.button>
      </div>
    </motion.div>
  );
}
