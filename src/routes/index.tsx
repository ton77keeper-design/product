import { createFileRoute, Link } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { StoreCard } from '@/components/StoreCard';
import { stores, categories } from '@/lib/data/stores';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Filter } from 'lucide-react';

export const Route = createFileRoute('/')({ 
  component: HomePage,
});

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addNotification } = useAppStore();
  const [showFilter, setShowFilter] = useState(false);

  const filteredStores = selectedCategory
    ? stores.filter(s => s.tags.some(tag => tag.includes(selectedCategory)))
    : stores;

  return (
    <AppShell>
      <div className="bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900 px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Актау, Казахстан</span>
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Добро пожаловать! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">Доставка продуктов из супермаркетов за 20-30 минут</p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold mb-3">Категории</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stores */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Популярные магазины</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map((store, idx) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <StoreCard store={store} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl p-4 text-white"
        >
          <h3 className="font-bold mb-2">🎉 Спецпредложение!</h3>
          <p className="text-sm mb-3">Кэшбэк 5% на первый заказ + бесплатная доставка от 2000 ₸</p>
          <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold text-sm">
            Заказать сейчас
          </button>
        </motion.div>
      </div>
    </AppShell>
  );
}
