export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const formatKzt = (price: number): string => {
  return new Intl.NumberFormat('kk-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('kk-KZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString('kk-KZ', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRelativeTime = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];

  for (const [count, unit] of intervals) {
    const interval = Math.floor(seconds / count);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};
