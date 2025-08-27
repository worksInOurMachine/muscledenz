"use client";
import { ProductSorter } from "@/components/Product/product-sorter";
import ProductCard from "@/components/Product/ProductCard";
import ProductNotFound from "@/components/ProductNotFound";
import { categories } from "@/config/categories.config";
import strapi from "@/sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loading";

const fetchProducts = async ({ pageParam = 1, query, category }: { pageParam?: number, query: string, category: string }) => {
  const filters: any = {};
  if (query) {
    filters.$or = [
      { name: { $containsi: query } },
      { description: { $containsi: query } },
    ];
  };
  if (category && category !== "all"){
  filters.category = {
    name: category === "all" ? "" : category
  }
}

  const res = await strapi.find("products", {
    pagination: {
      page: pageParam,
      pageSize: 5,
    },
    populate: ["thumbnail"],
    filters,
  }) as any

  return {
    data: res.data,
    nextPage:
      pageParam < res.meta.pagination.pageCount ? pageParam + 1 : undefined,
  };
}


export default function ProductListingPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const q = searchParams.get("query") || "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", { q, category }],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, query: q, category }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const products = data?.pages.flatMap((page) => page.data) ?? [];
  if (!products.length && !isLoading) {
    return <ProductNotFound />;
  }
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
              {products.length} products
            </p>
            <ProductSorter />
          </div>
      
          <div className="flex-1">
            <div className="flex-1">
              {
                isLoading ? <div className=" flex justify-center items-center"><Loading /></div> : <>
                  <InfiniteScroll
                    dataLength={products.length}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<div className="flex justify-center w-full items-center mt-4"><Loading height="20px" /></div>}
                  >
                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: Number(product.id) * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <ProductNotFound />
                    )}
                  </InfiniteScroll>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
