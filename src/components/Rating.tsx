import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviews: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}

export function Rating({ rating, reviews, onRate, interactive }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={interactive ? { scale: 1.2 } : {}}
            onClick={() => interactive && onRate?.(star)}
            className="cursor-pointer"
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {rating.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}
