import DiscountedPrice from "@/components/Product/calculateDiscountedPrice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductResType } from "@/types/product";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ProductCard({ product, addToCart }: { product: ProductResType, addToCart: any }) {
  const { data } = useSession();

  // const  handleBuyNow = () => {
  //   if (!data?.user.id) {
  //     localStorage.setItem(
  //       "redirectRoute",
  //       JSON.stringify(`/checkout/${product.documentId}`)
  //     );
  //     window.location.href = "/login";
  //     return
  //   }
  //   window.location.href = `/checkout/${product.documentId}`;
  // };

  const handleBuyNow = () => {
    if (!product.ecomUrl) {
      window.open("https://www.amazon.in/s?k=Muscledenz&ref=bl_dp_s_web_0", "_blank");
      return;
    }
    window.open(product.ecomUrl, "_blank");
  };

  return (
    <Card className="relative border-0 shadow-md bg-slate-100 flex flex-col p-4 min-h-[360px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[480px]">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-green-600/80 hover:bg-green-700 text-white text-xs sm:text-sm">
            {product.discount}% OFF
          </Badge>
        </div>
      )}

      {/* Wishlist Button */}
      {/* <button className="absolute top-4 right-4 z-10 p-1 hover:scale-110 transition-transform">
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </button> */}

      {/* Product Image */}
      <div className="relative w-full flex justify-center items-center  rounded-lg overflow-hidden  bg-white p-2">
        <Image
          src={
            product.thumbnail?.url ||
            "/images/dummy.jpg"
          }
          alt={product.name}
          width={400}
          height={400}
          className="object-contain w-[80%] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px]"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow px-1 justify-between">
        {/* Product Name & Description */}

        <Link href={`/products/${product.documentId}`}>
          <div className="mt-3 space-y-2">
            <h3 className="font-semibold text-gray-900 text-lg  md:text-lg line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          </div>
        </Link>

        {/* Pricing & Discount */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-semibold">
              <DiscountedPrice
                price={product.price}
                discountPercentage={product.discount}
              />
            </span>
          </div>
        </div>

        {/* Add to Cart Button - Now opens WhatsApp */}
        <div className=" w-full flex justify-between gap-2">
          <Button
            className=" w-full bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base py-2 mt-3 flex items-center justify-center gap-2"
            onClick={handleBuyNow}
          >
          
            Buy Now
          </Button>

          {/* <Button
            className=" bg-white text-black border-2 hover:bg-gray-200 border-black text-sm sm:text-base py-2 mt-3 flex items-center justify-center gap-2"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart />
          </Button> */}
        </div>
      </div>
    </Card>
  );
}
