import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { useAppStore } from '@/lib/store';
import { NotificationItem } from '@/components/NotificationItem';
import { motion } from 'framer-motion';
import { Bell, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/notifications')({ 
  component: NotificationsPage,
});

function NotificationsPage() {
  const { notifications, markAsRead, clearNotifications } = useAppStore();

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-display font-bold">Уведомления</h1>
          </div>
          {notifications.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => clearNotifications()}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 px-3 py-2 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
              Очистить
            </motion.button>
          )}
        </motion.div>

        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Нет уведомлений</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDismiss={markAsRead}
              />
            ))}
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
