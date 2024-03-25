export function formatPrice(price: number): string {
  const [integerPart, decimalPart] = price.toFixed(2).split(".");

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return `$${formattedIntegerPart}.${decimalPart}`;
}
