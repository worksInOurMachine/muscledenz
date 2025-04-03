"use client"
import { ProductResType } from "@/types/product"
import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

export default function ProductGrid({ products }: { products: ProductResType[] }) {
   

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-6">
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
    )
}

