import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";
import React from "react";


const DiscountedPrice = ({
  price,
  discountPercentage,
}: {
  price: number;
  discountPercentage: number;
}) => {

  if (discountPercentage === 0) {
    
  }

  const discountedPrice = calculateDiscountedPrice({ price, discountPercentage });

  return (
    <p className="text-lg space-x-2 font-semibold">
      <span className=" font-bold">₹{discountedPrice.toFixed(2)}</span>
      {discountPercentage !== 0 && 
      <> <span className="line-through text-sm text-gray-600 mr-2">₹{price}</span>
    <span className="text-xs text-green-600">{discountPercentage}% Off</span> </>}
      {/* <span className="text-green-600">Save ₹{(price - discountedPrice).toFixed(0)}</span> */}
    </p>
  );
};

export default DiscountedPrice;
