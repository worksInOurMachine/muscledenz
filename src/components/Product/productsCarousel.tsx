"use client";

 
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "./ProductCard";
import { addItemsToCart } from "@/redux/actions/cart-actions";
import { useAppDispatch } from "@/redux/hook";
import { ProductResType } from "@/types/product";

export default function ProductCarousel({
  products,
}: {
  products: ProductResType[];
}) {
  const dispatch = useAppDispatch()
  const addToCart = (product: string) => {
    dispatch(addItemsToCart(product, 1))
  }
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
              <ProductCard product={product} addToCart={addToCart} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
