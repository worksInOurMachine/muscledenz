"use client";
import ProductGrid from "@/components/Product/product-grid";
import { ProductSorter } from "@/components/Product/product-sorter";
import ProductNotFound from "@/components/ProductNotFound";
import { categories } from "@/config/categories.config";
import { strapi } from "@/lib/strapi";
import { ProductType } from "@/types/product";
// import { products } from "@/config/products.config";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetchProducts = async () => {
  try {
    const res = await strapi.find("products", {
      populate: "*",
    });

    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export default function ProductListingPage() {
  const { data, error } = useSWR("products", fetchProducts);
  const products = data?.data || [];
  console.log(products);
  // console.log(data);
  if (error) return <div>Failed to load</div>;
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("query");
  const [fProducts, setFProducts] = useState(products as ProductType[]);

  useEffect(() => {
    let filtered = products as ProductType[];
    if (products.length === 0) return;
    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category?.slug === category);
    }

    if (query) {
      console.log(query);
      filtered = filtered.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFProducts(filtered);
  }, [category, query, products]);

  return (
    <div className="container-- mx-auto px-4 py-8">
      <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-8 tracking-tight capitalize">
        {category
          ? categories.find((ct) => ct.slug === category)?.name
          : "Featured Products"}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/*    <div className="w-full md:w-64 shrink-0">
                    <ProductFilters />
                </div> */}

        <div className="flex-1  px-2 md:px-4">
          <div className="flex  flex-wrap justify-between items-center mb-6">
            <p className="text-muted-foreground my-4 ">
              {fProducts.length} products
            </p>
            <ProductSorter />
          </div>
          {!fProducts.length ? (
            <ProductNotFound />
          ) : (
            <ProductGrid products={fProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
