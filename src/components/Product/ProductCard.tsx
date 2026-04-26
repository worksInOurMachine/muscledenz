import DiscountedPrice from "@/components/Product/calculateDiscountedPrice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductResType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";

export default function ProductCard({ product, addToCart }: { product: ProductResType, addToCart: any }) {
  const { data } = useSession();

  const handleBuyNow = () => {
    if (!product.ecomUrl) {
      window.open("https://www.amazon.in/s?k=Muscledenz&ref=bl_dp_s_web_0", "_blank");
      return;
    }
    window.open(product.ecomUrl, "_blank");
  };

  return (
    <Card className="group relative flex flex-col bg-card border border-border/60 overflow-hidden min-h-[380px] sm:min-h-[420px] md:min-h-[440px]">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-success text-white text-xs font-bold px-2.5 py-1 rounded-md border-none shadow-sm">
            {product.discount}% OFF
          </Badge>
        </div>
      )}

      {/* Image */}
      <Link href={`/products/${product.documentId}`} className="block">
        <div className="relative w-full bg-muted/40 flex items-center justify-center p-6 overflow-hidden aspect-square">
          <Image
            src={product.thumbnail?.url || "/images/dummy.jpg"}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain w-[85%] h-[85%] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-grow p-4 gap-2">
        <Link href={`/products/${product.documentId}`} className="space-y-1">
          <h3 className="font-bold text-foreground text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto pt-3 space-y-3">
          {/* Price */}
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Price</span>
            <div className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              <DiscountedPrice
                price={product.price}
                discountPercentage={product.discount}
              />
            </div>
          </div>

          {/* Buy Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-xl btn-premium text-sm"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
