import { Heart } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import DiscountedPrice from "@/components/Product/calculateDiscountedPrice";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card className="relative border-0 shadow-md bg-slate-100 min-h-[370px] sm:min-h-[450px] md:min-h-[450px] flex flex-col p-4">
      <div className="absolute top-1 left-1 z-10 text-white px-1 py-1 text-xs sm:text-sm font-medium">
        <Badge className="bg-green-600 hover:bg-green-700 text-white" variant={"secondary"} children={product.discount + '% OFF'} />
      </div>
      <button className="absolute top-2 right-2 z-10 p-1 hover:scale-110 transition-transform">
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </button>
      <div className="relative w-full h-40 sm:h-44 md:h-48 flex justify-center items-center mb-6">
        <img
          src={product.image || "https://img8.hkrtcdn.com/35862/pck_3586117_c_m.jpg"}
          alt={product.name}
          className="object-contain"
        />
      </div>
      {/* <div className="absolute top-4 left-4">
        <div
          className={`w-4 h-4 border-2 ${
            product.isVeg ? "border-green-600" : "border-red-600"
          } rounded-sm`}
        >
          <div
            className={`w-2 h-2 m-0.5 rounded-sm ${
              product.isVeg ? "bg-green-600" : "bg-red-600"
            }`}
          />
        </div>
      </div> */}
      <div className="space-y-1 px-1 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-medium  text-gray-900  text-md sm:text-lg line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {product.description}
          </p>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-semibold">
                <DiscountedPrice price={product.price} discountPercentage={product.discount} />
              </span>
              {/* <span className="text-xs sm:text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-xs sm:text-sm text-green-600">
                Save ₹{product.originalPrice - product.price}
              </span> */}
            </div>
            {/* <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span>₹{product.premiumPrice}</span>
              <span className="text-amber-500">with</span>
              <span className="font-medium text-amber-500">Premium</span>
            </div> */}
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base py-2">
            ADD TO CART
          </Button>
        </div>
      </div>
    </Card>
  );
}
