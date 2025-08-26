import { Heart } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import DiscountedPrice from "@/components/Product/calculateDiscountedPrice";
import Link from "next/link";
import { ProductResType } from "@/types/product";

export default function ProductCard({ product }: { product: ProductResType }) {
  const openWhatsAppChat = () => {
    const imageUrl = product.thumbnail?.url;
    const message = `Hello, I'm interested in purchasing:\n\n*${
      product.name
    }*\n\nPrice: ${
      product.discount > 0
        ? `₹${(product.price * (1 - product.discount / 100)).toFixed(2)} (${
            product.discount
          }% OFF)`
        : `₹${product.price}`
    }\n\nDescription: ${
      product.description
    }\n\nProduct Image: ${imageUrl}\n\nPlease provide more information about this product.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "917617290091";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
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
      <button className="absolute top-4 right-4 z-10 p-1 hover:scale-110 transition-transform">
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </button>

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

        <Link href={`/products/${product.id}`}>
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
        <Button
          className="w-full bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base py-2 mt-3 flex items-center justify-center gap-2"
          onClick={openWhatsAppChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="white"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Buy Now
        </Button>
      </div>
    </Card>
  );
}
