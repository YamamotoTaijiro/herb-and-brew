const dateFmt = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
});

const dateOnlyFmt = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatDate(date: Date): string {
  return dateFmt.format(date);
}

export function formatDateShort(date: Date): string {
  return dateOnlyFmt.format(date);
}

export function formatPrice(price: number): string {
  return price === 0 ? '無料' : `¥${price.toLocaleString('ja-JP')}`;
}
