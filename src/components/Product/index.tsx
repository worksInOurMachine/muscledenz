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
    <div className="w-full mt-4">
      {title && (
        <p className="section-title mb-6">{title}</p>
      )}
      <div className="max-w-7xl mx-auto">
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}

export default Index;
