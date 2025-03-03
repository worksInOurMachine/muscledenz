import React from "react";
import ProductCarousel from "./productsCarousel";
import { products } from "@/config/products.config";
import { ProductResType } from "@/types/product";
import ScrollRevealAnimation from "../AnimatedComponent/ScrollRevealAnimation";

function Index({
  title,
  collectionType,
}: {
  title: string;
  collectionType: string;
}) {
  const filteredProducts: ProductResType[] = React.useMemo(
    () =>
      products.filter((product) => product.collectionType === collectionType),
    [collectionType]
  );

  return (
    <div className="w-full my-5 space-y-8 sm:space-y-10">
      {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-700 font-bold text-center"> */}
        <ScrollRevealAnimation
          baseOpacity={0}
          enableBlur={true}
          baseRotation={8}
          textClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 font-bold text-center  py-4 "
            rotationEnd="bottom bottom"
            wordAnimationEnd="bottom bottom"

        >
          {title}
        </ScrollRevealAnimation>
      {/* </h1> */}
      <div className="max-w-7xl mx-auto px-2--- sm:px-6 lg:px-8">
        <ProductCarousel products={filteredProducts} />
      </div>
    </div>
  );
}

export default Index;
