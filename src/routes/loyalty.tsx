import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { motion } from 'framer-motion';
import { Gift, Award, Zap, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatKzt } from '@/lib/utils';

export const Route = createFileRoute('/loyalty')({ 
  component: LoyaltyPage,
});

function LoyaltyPage() {
  const { stats } = useAppStore();

  const loyaltyTiers = [
    {
      name: 'Серебро',
      emoji: '🥈',
      minSpend: 0,
      maxSpend: 50000,
      benefits: ['3% кэшбэк', 'Приоритетная доставка'],
    },
    {
      name: 'Золото',
      emoji: '🥇',
      minSpend: 50000,
      maxSpend: 150000,
      benefits: ['5% кэшбэк', 'Бесплатная доставка от 1500 ₸', 'Ранний доступ к акциям'],
    },
    {
      name: 'Платина',
      emoji: '💎',
      minSpend: 150000,
      maxSpend: Infinity,
      benefits: ['7% кэшбэк', 'Бесплатная доставка от 1000 ₸', 'Персональный менеджер'],
    },
  ];

  const currentTier = loyaltyTiers.find(
    (tier) => stats.totalSpent >= tier.minSpend && stats.totalSpent < tier.maxSpend
  ) || loyaltyTiers[0];

  const nextTier = loyaltyTiers[loyaltyTiers.indexOf(currentTier) + 1];
  const progressToNext = nextTier
    ? ((stats.totalSpent - currentTier.minSpend) / (nextTier.minSpend - currentTier.minSpend)) * 100
    : 100;

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Current Tier */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6"
        >
          <div className="text-center">
            <div className="text-6xl mb-2">{currentTier.emoji}</div>
            <h1 className="text-3xl font-bold mb-2">{currentTier.name}</h1>
            <p className="text-purple-100">Статус постоянного клиента</p>
          </div>
        </motion.div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">До {nextTier.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatKzt(stats.totalSpent)} / {formatKzt(nextTier.minSpend)}
              </p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* Current Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6"
        >
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Gift className="w-5 h-5 text-green-600" />
            Текущие привилегии
          </h2>
          <div className="space-y-2">
            {currentTier.benefits.map((benefit, idx) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-2 text-green-700 dark:text-green-400"
              >
                <Zap className="w-4 h-4" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
        >
          <StatCard label="Баллы" value={stats.loyaltyPoints} icon={Award} />
          <StatCard label="Кэшбэк" value={formatKzt(stats.cashbackEarned)} icon={TrendingUp} />
          <StatCard label="Заказов" value={stats.ordersCount} icon={Gift} />
        </motion.div>

        {/* All Tiers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4"
        >
          <h2 className="font-semibold mb-4">Все уровни</h2>
          <div className="space-y-3">
            {loyaltyTiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-3 rounded-lg border-2 transition-all ${
                  currentTier.name === tier.name
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tier.emoji}</span>
                    <div>
                      <p className="font-semibold">{tier.name}</p>
                      <p className="text-xs text-gray-500">
                        От {formatKzt(tier.minSpend)}
                      </p>
                    </div>
                  </div>
                  {currentTier.name === tier.name && (
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                      Текущий
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 text-center"
    >
      <Icon className="w-5 h-5 mx-auto mb-1 text-purple-600" />
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="font-bold text-sm">{value}</p>
    </motion.div>
  );
}
