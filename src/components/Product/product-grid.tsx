"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Sample product data
const products = [
    {
        id: 1,
        name: "Minimalist Desk Lamp",
        price: 89.99,
        rating: 4.5,
        image: "/placeholder.svg?height=400&width=400",
        category: "Home",
        isNew: true,
        isSale: false,
    },
    {
        id: 2,
        name: "Ergonomic Office Chair",
        price: 299.99,
        rating: 4.8,
        image: "/placeholder.svg?height=400&width=400",
        category: "Office",
        isNew: false,
        isSale: true,
        salePrice: 249.99,
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 159.99,
        rating: 4.3,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        isNew: false,
        isSale: false,
    },
    {
        id: 4,
        name: "Smart Watch Series 5",
        price: 249.99,
        rating: 4.7,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        isNew: true,
        isSale: false,
    },
    {
        id: 5,
        name: "Leather Notebook",
        price: 24.99,
        rating: 4.2,
        image: "/placeholder.svg?height=400&width=400",
        category: "Office",
        isNew: false,
        isSale: false,
    },
    {
        id: 6,
        name: "Ceramic Coffee Mug",
        price: 18.99,
        rating: 4.0,
        image: "/placeholder.svg?height=400&width=400",
        category: "Home",
        isNew: false,
        isSale: true,
        salePrice: 14.99,
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 79.99,
        rating: 4.6,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        isNew: false,
        isSale: false,
    },
    {
        id: 8,
        name: "Minimalist Wall Clock",
        price: 49.99,
        rating: 4.4,
        image: "/placeholder.svg?height=400&width=400",
        category: "Home",
        isNew: false,
        isSale: false,
    },
    {
        id: 9,
        name: "Mechanical Keyboard",
        price: 129.99,
        rating: 4.9,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        isNew: true,
        isSale: false,
    },
    {
        id: 10,
        name: "Desk Organizer",
        price: 34.99,
        rating: 4.1,
        image: "/placeholder.svg?height=400&width=400",
        category: "Office",
        isNew: false,
        isSale: true,
        salePrice: 29.99,
    },
    {
        id: 11,
        name: "Portable Power Bank",
        price: 49.99,
        rating: 4.5,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        isNew: false,
        isSale: false,
    },
    {
        id: 12,
        name: "Scented Candle Set",
        price: 39.99,
        rating: 4.3,
        image: "/placeholder.svg?height=400&width=400",
        category: "Home",
        isNew: false,
        isSale: false,
    },
]

export default function ProductGrid() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: product.id * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                >
                    <Card
                        className="h-full flex flex-col overflow-hidden group"
                        onMouseEnter={() => setHoveredId(product.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="relative pt-4 px-4">
                            {product.isNew && (
                                <Badge className="absolute top-6 left-6 z-10 bg-green-500 hover:bg-green-600">New</Badge>
                            )}
                            {product.isSale && (
                                <Badge className="absolute top-6 right-6 z-10 bg-red-500 hover:bg-red-600">Sale</Badge>
                            )}
                            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        <CardContent className="flex-grow pt-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground">{product.category}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1 text-sm">{product.rating}</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3">
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    {product.isSale ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold">${product.salePrice}</span>
                                            <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                                        </div>
                                    ) : (
                                        <span className="text-lg font-bold">${product.price}</span>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                        "transition-colors duration-300",
                                        hoveredId === product.id ? "text-red-500 hover:text-red-600" : "",
                                    )}
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button className="w-full gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

