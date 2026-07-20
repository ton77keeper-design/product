import { motion } from 'framer-motion';
import { Notification } from '@/lib/store';
import { X, Bell, Tag, AlertCircle } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'promo':
        return <Tag className="w-5 h-5 text-orange-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-4 rounded-lg mb-3 flex gap-3 ${
        notification.read
          ? 'bg-gray-100 dark:bg-gray-800'
          : 'bg-blue-50 dark:bg-blue-900'
      }`}
    >
      {getIcon()}
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{notification.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {notification.message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
