export function formatPrice(price: string | number | undefined): string {
  if (price === undefined) return '0';
  return price.toLocaleString('ko-KR', { maximumFractionDigits: 1 });
}
