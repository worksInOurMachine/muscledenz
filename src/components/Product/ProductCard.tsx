import { Heart } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import DiscountedPrice from "@/components/Product/calculateDiscountedPrice";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card className="relative border-0 shadow-md bg-slate-100 flex flex-col p-4 min-h-[360px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[480px]">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
            {product.discount}% OFF
          </Badge>
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 z-10 p-1 hover:scale-110 transition-transform">
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </button>

      {/* Product Image */}
      <div className="relative w-full flex justify-center items-center">
        <img
          src={product.image || "https://img8.hkrtcdn.com/35862/pck_3586117_c_m.jpg"}
          alt={product.name}
          className="object-contain w-[80%] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px]"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow px-1 justify-between">
        {/* Product Name & Description */}
        <div className="mt-3 space-y-2">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-md md:text-lg line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing & Discount */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-semibold">
              <DiscountedPrice price={product.price} discountPercentage={product.discount} />
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base py-2 mt-3">
          ADD TO CART
        </Button>
      </div>
    </Card>
  );
}
