"use client"

import DiscountedPrice from "@/components/Product/calculateDiscountedPrice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice"
import { cartCalculation } from "@/lib/cartCalculation"
import { addItemsToCart, removeItemsToCart } from "@/redux/actions/cart-actions"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { CartType } from "@/types/cart"
import { Minus, Plus, ShoppingBag, ShoppingCartIcon, Tag, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function ShoppingCart() {
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector((state) => state.cart) || []
    const products = cart.cartItems as CartType[];
    const { data } = useSession();

 
    const PlusTocart = (prevQuntity: number, product: any, stock: number) => {
        const newQuantity = prevQuntity < stock ? prevQuntity + 1 : prevQuntity
        prevQuntity < stock && dispatch(addItemsToCart(product, newQuantity))
    }

    const MinusTocart = (prevQuntity: number, product: any) => {
        const newQuantity = prevQuntity > 1 ? prevQuntity - 1 : 1
        prevQuntity > 1 && dispatch(addItemsToCart(product, newQuantity))
    }
    const RemoveHandler = (documentId: string) => {
        dispatch(removeItemsToCart(documentId))
    };


    const handleCheckout = () => {
        if (!data?.user.id) {
            localStorage.setItem(
                "redirectRoute",
                JSON.stringify("/checkout")
            );
            window.location.href = "/login";
            return
        }
        window.location.href = "/checkout";
    }

    const { discount, shipping, subtotal, tax, total } = cartCalculation({ products, promoApplied:false })

    return (
        <>
            {
                products.length === 0 ? <div className=" flex flex-col gap-2 justify-center items-center h-[80vh]">
                    <ShoppingCartIcon size={100} />
                    <h4 className=" py-6 font-bold text-[25px] text-center ">
                        Cart is empty <br /> Add your first product
                    </h4>
                    <Link className=" bg-black text-white px-6 py-2 rounded-[10px] text-[20px]" href={"/products"}>Products </Link>
                </div> : <div className="min-h-screen bg-background">
                    {/* Header */}
                    <header className="border-b border-border bg-card">
                        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">Your Cart</h1>
                                </div>
                                <Badge variant="secondary" className="text-xs sm:text-sm">
                                    {products.length} {products.length === 1 ? "item" : "items"}
                                </Badge>
                            </div>
                        </div>
                    </header>

                    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="space-y-3 sm:space-y-4">
                                    {products.length > 0 ? products.map((item) => (
                                        <Card key={item.product.documentId} className="overflow-hidden">
                                            <CardContent className="p-4 sm:p-6">
                                                <div className="flex gap-3 sm:gap-4">
                                                    <img
                                                        src={item.product.thumbnail?.url || "/placeholder.svg"}
                                                        alt={item.product.name}
                                                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-semibold text-foreground text-balance text-sm sm:text-base">
                                                                    {item.product.name}
                                                                </h3>
                                                                <div className="mt-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-base sm:text-lg font-semibold">
                                                                            <DiscountedPrice
                                                                                price={item.product.price}
                                                                                discountPercentage={item.product.discount}
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => RemoveHandler(item.product.documentId)}
                                                                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                <span className="sr-only">Remove item</span>
                                                            </Button>
                                                        </div>
                                                        <div className="flex items-center justify-between sm:justify-start sm:gap-3 mt-3 sm:mt-4">
                                                            <div className="flex items-center border border-border rounded-lg">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => MinusTocart(Number(item.quantity), item.product)}
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <Minus className="h-3 w-3" />
                                                                </Button>
                                                                <span className="w-10 sm:w-12 text-center text-sm font-medium">{item.quantity}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => PlusTocart(Number(item.quantity), item.product, item.product.stock)}
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                                                                ₹{(calculateDiscountedPrice({ price: item.product.price, discountPercentage: item.product.discount }) * Number(item.quantity)).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )) : ""}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <Card className="lg:sticky lg:top-4">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Tag className="h-5 w-5" />
                                            Order Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                    

                                        <Separator />

                                        {/* Price Breakdown */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal</span>
                                                <span>₹{subtotal.toFixed(2)}</span>
                                            </div>
                                       
                                            <div className="flex justify-between text-sm">
                                                <span>Shipping</span>
                                                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Tax</span>
                                                <span>₹{tax.toFixed(2)}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between text-base sm:text-lg font-bold">
                                                <span>Total</span>
                                                <span className="text-primary">₹{total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {subtotal < 50 && (
                                            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                                Add ₹{(50 - subtotal).toFixed(2)} more for free shipping!
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="pt-4">
                                        <Button className="w-full" size="lg" onClick={handleCheckout}>
                                            Proceed to Checkout
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

 