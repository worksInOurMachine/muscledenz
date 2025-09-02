import { CartType } from "@/types/cart";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";
export const cartCalculation = ({
  products,
  promoApplied,
}: {
  products: CartType[];
  promoApplied:boolean;
}) => {
  const subtotal = products.reduce(
    (sum, item) =>
      sum +
      calculateDiscountedPrice({
        price: item.product.price,
        discountPercentage: item.product.discount,
      }) *
        Number(item.quantity),
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 0;
  const tax = (subtotal - discount) * 0;
  const total = subtotal - discount + shipping + tax;

  return {subtotal,discount,shipping,tax,total}
};
