"use client"
import { ProductResType } from "@/types/product";
import ProductCarousel from "./productsCarousel";

function Index({
  title,
  products
}: {
  title: string;
  products: ProductResType[];
}) {

  return (
    <div className="w-full my-5 space-y-8 sm:space-y-10">
      <p
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 font-bold text-center  py-4 "
      >
        {title}
      </p>
      <div className="max-w-7xl mx-auto px-2--- sm:px-4 lg:px-8">
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}

export default Index;
