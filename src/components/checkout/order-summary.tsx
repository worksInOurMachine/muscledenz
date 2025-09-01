"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cartCalculation } from "@/lib/cartCalculation"
import { CartType } from "@/types/cart"
import { Separator } from "@radix-ui/react-select"
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice"
import { currency } from "@/lib/currency"
export type LineItem = {
    id: string
    name: string
    price: number
    quantity: number
    imageUrl?: string
}



export function OrderSummary({ items, currencyCode = "INR" }: { items: CartType[]; currencyCode?: string }) {

    const [promoCode, setPromoCode] = useState("")
    const [promoApplied, setPromoApplied] = useState(false)
    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "save10") {
            setPromoApplied(true)
        }
    }
    const { discount, shipping, subtotal, tax, total } = cartCalculation({ products: items, promoApplied })
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-pretty">Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li key={item.product.id} className="flex items-center justify-between">
                            <span className="text-sm">
                                {item.product.name} × {item.quantity}
                            </span>
                            <span className="text-sm font-medium">{currency(calculateDiscountedPrice({
                                price: item.product.price,
                                discountPercentage: item.product.discount,
                            }) * Number(item.quantity), currencyCode)}</span>
                        </li>
                    ))}
                </ul>
                <div className="h-px bg-border" />
                <div className="space-y-1 text-sm">
                    {/* Price Breakdown */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        {promoApplied && (
                            <div className="flex justify-between ">
                                <span>Discount (10%)</span>
                                <span>-₹{discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "Free" : currency(Number(shipping.toFixed(2)))}</span>
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
                </div>
                {/* Promo Code */}
             {/*    <div className="space-y-2">
                    <label htmlFor="promo" className="text-sm font-medium">
                        Promo Code
                    </label>
                    <div className="flex flex-col xs:flex-row gap-2">
                        <Input
                            id="promo"
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            variant="outline"
                            onClick={applyPromoCode}
                            disabled={promoApplied}
                            className="xs:w-auto bg-transparent"
                        >
                            Apply
                        </Button>
                    </div>
                    {promoApplied && <p className="text-sm text-accent">✓ Promo code applied!</p>}
                </div> */}
            </CardContent>
        </Card>
    )
}