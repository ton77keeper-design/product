import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  storeId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  items: CartItem[];
  total: number;
  status: 'new' | 'accepted' | 'picking' | 'delivering' | 'delivered';
  address: string;
  createdAt: number;
  deliveryTime?: number;
  rating?: number;
  review?: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  link?: string;
}

export interface UserStats {
  totalSpent: number;
  ordersCount: number;
  cashbackEarned: number;
  loyaltyPoints: number;
  favoriteStores: string[];
  averageOrderValue: number;
}

export interface Review {
  id: string;
  storeId: string;
  rating: number;
  text: string;
  createdAt: number;
  helpful: number;
}

export interface AppStore {
  // Role
  role: 'customer' | 'courier' | 'admin';
  setRole: (role: 'customer' | 'courier' | 'admin') => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  getOrder: (orderId: string) => Order | undefined;

  // Favorites
  favorites: Set<string>;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
  getUnreadCount: () => number;

  // User Stats
  stats: UserStats;
  updateStats: (updates: Partial<UserStats>) => void;
  addCashback: (amount: number) => void;
  addLoyaltyPoints: (points: number) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  getStoreReviews: (storeId: string) => Review[];

  // User Profile
  userName?: string;
  userEmail?: string;
  setUserInfo: (name: string, email: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useAppStore = create<AppStore>(
  persist(
    (set, get) => ({
      // Role
      role: 'customer',
      setRole: (role) => set({ role }),

      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== itemId),
        })),
      updateCartItem: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => {
          const stats = state.stats;
          const orderTotal = order.total;
          const cashback = orderTotal * 0.05; // 5% cashback
          const points = Math.floor(orderTotal / 100); // 1 point per 100 KZT

          return {
            orders: [...state.orders, order],
            stats: {
              ...stats,
              totalSpent: stats.totalSpent + orderTotal,
              ordersCount: stats.ordersCount + 1,
              cashbackEarned: stats.cashbackEarned + cashback,
              loyaltyPoints: stats.loyaltyPoints + points,
              averageOrderValue:
                (stats.totalSpent + orderTotal) / (stats.ordersCount + 1),
            },
          };
        }),
      updateOrder: (orderId, updates) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, ...updates } : o
          ),
        })),
      getOrder: (orderId) => get().orders.find((o) => o.id === orderId),

      // Favorites
      favorites: new Set(),
      addFavorite: (productId) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.add(productId);
          return { favorites: newFavorites };
        }),
      removeFavorite: (productId) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.delete(productId);
          return { favorites: newFavorites };
        }),
      isFavorite: (productId) => get().favorites.has(productId),

      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: generateId(),
              timestamp: Date.now(),
              read: false,
              ...notification,
            },
            ...state.notifications,
          ].slice(0, 50), // Keep last 50
        })),
      markAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        })),
      clearNotifications: () => set({ notifications: [] }),
      getUnreadCount: () =>
        get().notifications.filter((n) => !n.read).length,

      // User Stats
      stats: {
        totalSpent: 0,
        ordersCount: 0,
        cashbackEarned: 0,
        loyaltyPoints: 0,
        favoriteStores: [],
        averageOrderValue: 0,
      },
      updateStats: (updates) =>
        set((state) => ({
          stats: { ...state.stats, ...updates },
        })),
      addCashback: (amount) =>
        set((state) => ({
          stats: {
            ...state.stats,
            cashbackEarned: state.stats.cashbackEarned + amount,
          },
        })),
      addLoyaltyPoints: (points) =>
        set((state) => ({
          stats: {
            ...state.stats,
            loyaltyPoints: state.stats.loyaltyPoints + points,
          },
        })),

      // Reviews
      reviews: [],
      addReview: (review) =>
        set((state) => ({
          reviews: [
            {
              id: generateId(),
              createdAt: Date.now(),
              helpful: 0,
              ...review,
            },
            ...state.reviews,
          ],
        })),
      getStoreReviews: (storeId) =>
        get().reviews.filter((r) => r.storeId === storeId),

      // User Profile
      setUserInfo: (name, email) =>
        set({
          userName: name,
          userEmail: email,
        }),
    }),
    {
      name: 'guldia-store',
      partialize: (state) => ({
        ...state,
        favorites: Array.from(state.favorites),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.favorites)) {
          (state as any).favorites = new Set(state.favorites);
        }
      },
    }
  )
);
