"use client"

 
import { AddressSelector } from "@/components/checkout/address-selector"
import { type LineItem, OrderSummary } from "@/components/checkout/order-summary"
import { type Payment, PaymentForm } from "@/components/checkout/payment-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/redux/hook"
import { CartType } from "@/types/cart"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Step = "address" | "payment" | "success"

 

// For demo: if no cart exists, seed a pretend cart
function seedDemoCartIfEmpty() {
    const existing = window.localStorage.getItem("cart")
    if (!existing) {
        const demo: LineItem[] = [
            { id: "sku-101", name: "T-Shirt", price: 19.99, quantity: 2 },
            { id: "sku-205", name: "Cap", price: 12.5, quantity: 1 },
        ]
        window.localStorage.setItem("cart", JSON.stringify(demo))
    }
}

export default function CartCheckoutPage() {
    const { cart } = useAppSelector((state) => state.cart) || []
    const items = cart.cartItems as CartType[];
    const router = useRouter()
    const [step, setStep] = useState<Step>("address")
    const [placing, setPlacing] = useState(false)
 
    const [address, setAddress] = useState<any>({
        fullName: "",
        email: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    })
    const [payment, setPayment] = useState<Payment>({ method: "card" });

 
    const placeOrder = async () => {
        if (!items.length) {
            alert("Your cart is empty.")
            return
        }
        setPlacing(true)
        try {
            const res = await fetch("/api/checkout/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    address,
                    payment,
                    items,
                }),
            })
            if (!res.ok) throw new Error("Failed to place order")
            const data = await res.json()
            setStep("success")
            console.log("[v0] Cart order placed:", data)
            // Optionally clear cart
            // localStorage.removeItem("cart")
        } catch (err) {
            console.log("[v0] Error placing cart order:", (err as Error).message)
            alert("Something went wrong placing your order.")
        } finally {
            setPlacing(false)
        }
    }

    const handleAddressSelect = (selectedAddress: any) => {
        setAddress(selectedAddress)
    }

    return (
        <main className="max-w-5xl mx-auto p-4 md:p-8">
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-pretty">Checkout — Cart</h1>
                <p className="text-sm text-muted-foreground">Complete your order for all items in your cart.</p>
            </header>

            {step !== "success" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-pretty">{step === "address" ? "Shipping address" : "Payment"}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {step === "address" ? (
                                    <>
                                        <AddressSelector  />
                                    </>
                                ) : (
                                    <PaymentForm
                                        value={payment}
                                        onUpdate={(p) => setPayment((prev) => ({ ...prev, ...p }))}
                                        onBack={() => setStep("address")}
                                        onPlaceOrder={placeOrder}
                                        placing={placing}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <aside className="lg:col-span-1 space-y-4">
                        <OrderSummary items={items} />
                        
                    </aside>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-2 text-pretty">Order placed!</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Thank you for your purchase. A confirmation email will be sent shortly.
                        </p>
                        <div className="flex gap-2">
                            <Button onClick={() => router.push("/")}>Continue shopping</Button> 
                        </div>
                    </CardContent>
                     
                </Card>
            )}
        </main>
    )
}