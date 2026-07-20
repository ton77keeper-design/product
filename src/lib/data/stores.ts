export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  oldPrice?: number;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  minOrder: number;
  deliveryTime: number; // minutes
  deliveryFee: number;
  tags: string[];
  featured?: boolean;
}

export const categories: Category[] = [
  { id: '1', name: 'Фрукты', emoji: '🍎' },
  { id: '2', name: 'Овощи', emoji: '🥕' },
  { id: '3', name: 'Мясо', emoji: '🥩' },
  { id: '4', name: 'Рыба', emoji: '🐟' },
  { id: '5', name: 'Молочное', emoji: '🥛' },
  { id: '6', name: 'Хлеб', emoji: '🍞' },
  { id: '7', name: 'Напитки', emoji: '🥤' },
  { id: '8', name: 'Снеки', emoji: '🍿' },
];

export const stores: Store[] = [
  {
    id: '1',
    name: 'Магнум',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 2341,
    minOrder: 2000,
    deliveryTime: 25,
    deliveryFee: 500,
    tags: ['Популярное', 'Быстрая доставка'],
    featured: true,
  },
  {
    id: '2',
    name: 'Чучук',
    image: 'https://images.unsplash.com/photo-1557804506-669714531433?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 1856,
    minOrder: 1500,
    deliveryTime: 30,
    deliveryFee: 600,
    tags: ['Свежее', 'Экономно'],
    featured: true,
  },
  {
    id: '3',
    name: 'Евро Азия',
    image: 'https://images.unsplash.com/photo-1585518419759-147265bf2e56?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 1203,
    minOrder: 2500,
    deliveryTime: 35,
    deliveryFee: 700,
    tags: ['Премиум', 'Органика'],
  },
  {
    id: '4',
    name: 'Райончик',
    image: 'https://images.unsplash.com/photo-1606618981181-e0b0ad2b929a?w=400&h=300&fit=crop',
    rating: 4.3,
    reviews: 945,
    minOrder: 1000,
    deliveryTime: 20,
    deliveryFee: 400,
    tags: ['Близко', 'Дешево'],
  },
];

export const products: Record<string, Product[]> = {
  '1': [
    {
      id: 'p1',
      name: 'Яблоки красные',
      category: '1',
      price: 450,
      image: 'https://images.unsplash.com/photo-1560806e614371-fef41ac9c19e?w=200&h=200&fit=crop',
      rating: 4.7,
      reviews: 234,
    },
    {
      id: 'p2',
      name: 'Бананы',
      category: '1',
      price: 380,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop',
      rating: 4.8,
      reviews: 567,
    },
    {
      id: 'p3',
      name: 'Морковь',
      category: '2',
      price: 200,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop',
      rating: 4.6,
      reviews: 123,
    },
    {
      id: 'p4',
      name: 'Помидоры',
      category: '2',
      oldPrice: 550,
      price: 420,
      image: 'https://images.unsplash.com/photo-1592841519619-e76932c84e83?w=200&h=200&fit=crop',
      rating: 4.5,
      reviews: 456,
    },
    {
      id: 'p5',
      name: 'Молоко Айналайн',
      category: '5',
      price: 320,
      image: 'https://images.unsplash.com/photo-1550583328-6f60dd27f91e?w=200&h=200&fit=crop',
      rating: 4.8,
      reviews: 890,
    },
  ],
  '2': [
    {
      id: 'p6',
      name: 'Курица филе',
      category: '3',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop',
      rating: 4.7,
      reviews: 321,
    },
    {
      id: 'p7',
      name: 'Говядина',
      category: '3',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1599599810694-d3d8e34a3e26?w=200&h=200&fit=crop',
      rating: 4.9,
      reviews: 198,
    },
  ],
};
