"use client"

// import Image from "next/image"
// import { Heart } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ProductCard from "./ProductCard"
import Autoplay from "embla-carousel-autoplay"
// import { products } from "@/config/products.config"
import { ProductResType } from "@/types/product"



// interface Product {
//     id: number
//     title: string
//     description: string
//     price: number
//     originalPrice: number
//     premiumPrice: number
//     discount: number
//     image: string
//     isVeg: boolean
// }

// const products: Product[] = [
//     {
//         id: 1,
//         title: "Biozyme Performance Whey",
//         description: "4.4 lb Rich Chocolate with Shaker",
//         price: 5499,
//         originalPrice: 6198,
//         premiumPrice: 5334,
//         discount: 11,
//         image: "https://www.avvatarindia.com/images/product_images/1697551735_FOP.jpg",
//         isVeg: true,
//     },
//     {
//         id: 2,
//         title: "Fish Oil 1000mg & MB-Vite Multivitamin Combo",
//         description: "60 tablet(s) Unflavoured",
//         price: 899,
//         originalPrice: 1348,
//         premiumPrice: 872,
//         discount: 33,
//         image: "https://www.avvatarindia.com/images/product_images/1697551735_FOP.jpg",
//         isVeg: false,
//     },
//     {
//         id: 3,
//         title: "Super Gainer XXL Weight Gainer",
//         description: "2.2 lb Chocolate",
//         price: 1099,
//         originalPrice: 1719,
//         premiumPrice: 1066,
//         discount: 36,
//         image: "https://www.avvatarindia.com/images/product_images/1697551735_FOP.jpg",
//         isVeg: true,
//     },
//     {
//         id: 4,
//         title: "Ashwagandha AF-43 6",
//         description: "60 capsules",
//         price: 599,
//         originalPrice: 749,
//         premiumPrice: 581,
//         discount: 20,
//         image: "https://www.avvatarindia.com/images/product_images/1697551735_FOP.jpg",
//         isVeg: true,
//     },
//     {
//         id: 5,
//         title: "Ashwagandha AF-43 6",
//         description: "60 capsules",
//         price: 599,
//         originalPrice: 749,
//         premiumPrice: 581,
//         discount: 20,
//         image: "https://www.avvatarindia.com/images/product_images/1697551735_FOP.jpg",
//         isVeg: true,
//     },
//     {
//         id: 6,
//         title: "Ashwagandha AF-43 6",
//         description: "60 capsules",
//         price: 599,
//         originalPrice: 749,
//         premiumPrice: 581,
//         discount: 20,
//         image: "https://www.avvatarindia.com/images/product_images/1697551735_FOP.jpg",
//         isVeg: true,
//     }
// ]

export default function ProductCarousel({products}:{products:ProductResType[]}) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    slidesToScroll: 1,
                 
                }}
                plugins={[
                    Autoplay({
                      delay: 2000 + Math.random() * 2000,
                    }),
                  ]}
               
                className="w-[100%] sm:w-full mx-auto"
            >
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="basis-[85%] md:basis-1/3 lg:basis-1/4">
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
            </Carousel>
        </div>
    )
}
