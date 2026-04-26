"use client";

import { ProductSorter } from "@/components/Product/product-sorter";
import ProductCard from "@/components/Product/ProductCard";
import ProductNotFound from "@/components/ProductNotFound";
import strapi from "@/sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loading";
import { useAppDispatch } from "@/redux/hook";
import { addItemsToCart } from "@/redux/actions/cart-actions";
import { Filter, Search as SearchIcon } from "lucide-react";

const fetchProducts = async ({ pageParam = 1, query, category }: { pageParam?: number, query: string, category: string }) => {
  const filters: any = {};
  if (query) {
    filters.$or = [
      { name: { $containsi: query } },
      { description: { $containsi: query } },
    ];
  };
  if (category) {
    filters.category = {
      slug: category,
    }
  }

  const res = await strapi.find("products", {
    pagination: {
      page: pageParam,
      pageSize: 12,
    },
    populate: ["thumbnail"],
    filters,
  }) as any;

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
  const dispatch = useAppDispatch()
  
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

  const addToCart = (product: string) => {
    dispatch(addItemsToCart(product, 1))
  }

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* ─── Page Header ─── */}
      <section className="bg-foreground text-background py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-12" />
        <div className="container relative z-10 mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-2 border border-primary/20 backdrop-blur-md animate-reveal">
            <SearchIcon size={14} />
            <span>{category ? "Category" : "Store Wide"}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none animate-reveal">
            {category 
              ? category.split("-")?.[0]
              : q ? `Search: ${q}` : "Our Products"}
            {category && <span className="text-primary italic"> Collection</span>}
          </h1>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full animate-reveal" style={{ animationDelay: '0.1s' }} />
        </div>
      </section>

      {/* ─── Controls Bar ─── */}
      <section className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <p className="text-sm font-black uppercase tracking-widest text-muted-foreground hidden sm:block">
              {isLoading ? "Counting..." : `${products.length} Products Found`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 border border-border/50 rounded-xl bg-card">
              <ProductSorter />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Product Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loading height="auto" />
            <p className="font-black uppercase tracking-tighter text-2xl animate-pulse">Forging Your Results...</p>
          </div>
        ) : products.length > 0 ? (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<div className="flex justify-center w-full py-12"><Loading height="40px" /></div>}
            className="overflow-visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence>
                {products.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (idx % 12) * 0.05,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="h-full"
                  >
                    <ProductCard product={product} addToCart={addToCart} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </InfiniteScroll>
        ) : (
          <div className="animate-reveal">
            <ProductNotFound />
          </div>
        )}
      </section>
    </main>
  );
}
