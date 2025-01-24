export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const formatPrice = (price: string) => {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  return isNaN(numericPrice) ? '$0.00' : `$${numericPrice.toFixed(2)}`;
};

export const calculateSavings = (originalPrice: number, bundlePrice: number) => {
  const savings = originalPrice - bundlePrice;
  return savings > 0 ? formatPrice(`$${savings.toFixed(2)}`) : '$0.00';
};