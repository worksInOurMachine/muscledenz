export const calculateDiscountedPrice = ({
  price,
  discountPercentage,
}: {
  price: number;
  discountPercentage: number;
}): number => {
  if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid price or discount percentage");
  }

  const discountedPrice = price - (price * discountPercentage) / 100;
  return Math.round(discountedPrice * 100) / 100;
};
