import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { useAppStore, Order } from '@/lib/store';
import { formatKzt, formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Package, Check, Truck, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/orders')({ 
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useAppStore();

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'delivering':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'picking':
        return <Clock className="w-5 h-5 text-orange-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      new: 'Новый',
      accepted: 'Принят',
      picking: 'Комплектуется',
      delivering: 'В доставке',
      delivered: 'Доставлен',
    };
    return labels[status];
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Мои заказы
        </motion.h1>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">У вас еще нет заказов</p>
            <Link
              to="/"
              className="text-green-600 hover:underline font-medium"
            >
              Начать заказ
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to="/orders/$orderId" params={{ orderId: order.id }}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(order.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{order.storeName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(order.createdAt)} • {order.items.length} товаров
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatKzt(order.total)}</p>
                      <p className="text-xs text-gray-500">{getStatusLabel(order.status)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
