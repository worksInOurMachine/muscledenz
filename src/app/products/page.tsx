"use client"
import ProductGrid from "@/components/Product/product-grid"
import { ProductSorter } from "@/components/Product/product-sorter"
import { categories } from "@/config/categories.config";
import { products } from "@/config/products.config"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductListingPage() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category")
    const [fProducts, setFProducts] = useState(products)
    useEffect(() => {
        if (!category || category === "all") {
            return setFProducts(products)
        }
        const fp = products.filter((p) => p.category.slug === category)
        setFProducts(fp)
    }, [category])
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-8 tracking-tight capitalize">{category ? categories.find((ct) => ct.slug === category)?.name : "Featured Products"}</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/*    <div className="w-full md:w-64 shrink-0">
                    <ProductFilters />
                </div> */}

                <div className="flex-1 sm:px-14 px-8">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-muted-foreground">Showing {fProducts.length} products</p>
                        <ProductSorter />
                    </div>

                    <ProductGrid products={fProducts} />
                </div>
            </div>
        </div>
    )
}

