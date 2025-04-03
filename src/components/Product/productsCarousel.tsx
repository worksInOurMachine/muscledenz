"use client";

// import Image from "next/image"
// import { Heart } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import Autoplay from "embla-carousel-autoplay";
// import { products } from "@/config/products.config"
import { ProductResType } from "@/types/product";

export default function ProductCarousel({
  products,
}: {
  products: ProductResType[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[
          Autoplay({
            delay: 2000 + Math.random() * 2000,
          }),
        ]}
        className="w-[100%] sm:w-full mx-auto"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[85%] md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
