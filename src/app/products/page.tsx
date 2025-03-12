import ProductGrid from "@/components/Product/product-grid"
import { ProductSorter } from "@/components/Product/product-sorter"
import { products } from "@/config/products.config"

export default function ProductListingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-8 tracking-tight">Featured Products</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/*    <div className="w-full md:w-64 shrink-0">
                    <ProductFilters />
                </div> */}

                <div className="flex-1 sm:px-14 px-8">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-muted-foreground">Showing {products.length} products</p>
                        <ProductSorter />
                    </div>

                    <ProductGrid  products={products} />
                </div>
            </div>
        </div>
    )
}

