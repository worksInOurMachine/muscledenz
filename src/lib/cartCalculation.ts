import { CartType } from "@/types/cart";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";
export const cartCalculation = ({
  products,
  promoDiscount = 0,
  promoCodeApplied,
  setAmount,
}: {
  products: CartType[];
  promoDiscount?: number;
  promoCodeApplied?: boolean;
  setAmount?: any;
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

  const shipping = subtotal > 50 ? 0 : 0;
  const discount = promoDiscount;
  const tax = subtotal * 0;
  const total = promoCodeApplied
    ? subtotal - (discount / 100) * subtotal + shipping + tax
    : subtotal + shipping + tax;
  if (setAmount) {
    setAmount(total);
  }

  return { subtotal, shipping, tax, total };
};
