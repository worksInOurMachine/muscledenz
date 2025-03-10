import ProductGrid from "@/components/Product/product-grid"
import ProductFilters from "@/components/Product/product-filters"
import { ProductSorter } from "@/components/Product/product-sorter"

export default function ProductListingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 tracking-tight">Featured Products</h1>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 shrink-0">
                    <ProductFilters />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-muted-foreground">Showing 24 products</p>
                        <ProductSorter />
                    </div>

                    <ProductGrid />
                </div>
            </div>
        </div>
    )
}

