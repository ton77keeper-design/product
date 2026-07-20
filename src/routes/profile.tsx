import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { useAppStore } from '@/lib/store';
import { formatKzt, formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap } from 'lucide-react';

export const Route = createFileRoute('/profile')({ 
  component: ProfilePage,
});

function ProfilePage() {
  const { userName, stats, orders } = useAppStore();

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {userName?.charAt(0) || '👤'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userName || 'Пользователь'}</h1>
              <p className="text-gray-600 dark:text-gray-400">Постоянный клиент</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <StatCard
            icon={TrendingUp}
            label="Всего потрачено"
            value={formatKzt(stats.totalSpent)}
            color="text-blue-600"
          />
          <StatCard
            icon={Zap}
            label="Заказов"
            value={stats.ordersCount.toString()}
            color="text-orange-600"
          />
          <StatCard
            icon={Award}
            label="Кэшбэк"
            value={formatKzt(stats.cashbackEarned)}
            color="text-green-600"
          />
          <StatCard
            icon={Award}
            label="Баллы"
            value={stats.loyaltyPoints.toString()}
            color="text-purple-600"
          />
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Последние заказы</h2>
          {orders.slice(0, 5).map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div>
                <p className="font-medium">{order.storeName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{formatKzt(order.total)}</p>
                <p className="text-xs text-gray-500 capitalize">{order.status}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
    >
      <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </motion.div>
  );
}
