import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { categories, stores, products } from '@/lib/data/stores';
import { ProductCard } from '@/components/ProductCard';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export const Route = createFileRoute('/search')({ 
  component: SearchPage,
});

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const { addToCart, addNotification } = useAppStore();

  // Flatten all products
  const allProducts = Object.values(products).flat();
  
  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    if (product) {
      addToCart({
        id: productId,
        storeId: '1',
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      addNotification({
        type: 'order',
        title: 'Добавлено в корзину',
        message: `${product.name} добавлен в корзину`,
      });
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-green-600"
            />
          </div>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h2 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Категории</h2>
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="px-3 py-1 rounded-full text-sm whitespace-nowrap bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-600 transition-colors"
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Товары не найдены' : 'Начните вводить для поиска'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Найдено {filtered.length} товаров
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((product, idx) => (
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
        )}
      </div>
    </AppShell>
  );
}
