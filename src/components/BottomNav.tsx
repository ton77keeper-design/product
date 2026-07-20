import { useAppStore } from '@/lib/store';
import { Link } from '@tanstack/react-router';
import { Home, Search, ShoppingCart, Package, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function BottomNav() {
  const { role } = useAppStore();

  if (role !== 'customer') return null;

  const navItems = [
    { icon: Home, label: 'Главная', to: '/' },
    { icon: Search, label: 'Поиск', to: '/search' },
    { icon: ShoppingCart, label: 'Корзина', to: '/cart' },
    { icon: Package, label: 'Заказы', to: '/orders' },
    { icon: User, label: 'Профиль', to: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.to}
                className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
