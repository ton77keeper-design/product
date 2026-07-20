import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Bell, Settings, LogOut } from 'lucide-react';

export function RoleSwitcher() {
  const { role, setRole, getUnreadCount } = useAppStore();
  const unreadCount = getUnreadCount();

  const roles = [
    { value: 'customer' as const, label: '👤 Покупатель' },
    { value: 'courier' as const, label: '🛵 Курьер' },
    { value: 'admin' as const, label: '🛡 Админ' },
  ];

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex gap-2">
        {roles.map((r) => (
          <motion.button
            key={r.value}
            onClick={() => setRole(r.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              role === r.value
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {r.label}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {role === 'customer' && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.div>
        )}
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
}
