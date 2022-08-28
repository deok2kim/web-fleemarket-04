export function formatPrice(price: string | number | undefined): string {
  if (price === undefined) return '0';
  return price.toLocaleString('ko-KR', { maximumFractionDigits: 1 });
}

/**
 * 가격을 넘겨주면 콤마 찍어서 반환한다.
 * @param price
 * @returns
 */
export function setComma(price: string): string {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 점 찍힌 가격을 주면 콤마를 빼서 반환한다.
 * @param commaPrice
 * @returns
 */
export function deleteComma(commaPrice: string): string {
  return commaPrice.replace(/,/g, '');
}

/**
 * 오직 숫자만 입력할 수 있도록 막아준다. (숫자 이외의 것은 다 뺀다)
 * @param price
 * @returns
 */
export function setOnlyNumber(price: string): string {
  return price.replace(/[^0-9]/g, '');
}
