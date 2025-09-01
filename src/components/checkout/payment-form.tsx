"use client"

import type React from "react"
import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { Label } from "@radix-ui/react-label"
import clsx from "clsx"

export type Payment = {
    method: "card" | "cod"
    cardNumber?: string
    nameOnCard?: string
    expiry?: string
    cvc?: string
}

type Props = {
    value: Payment
    onUpdate: (patch: Partial<Payment>) => void
    onBack: () => void
    onPlaceOrder: () => Promise<void>
    placing?: boolean
}

export function PaymentForm({ value, onUpdate, onBack, onPlaceOrder, placing }: Props) {
    const formId = useId()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        await onPlaceOrder()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label className="mb-2 block">Payment method</Label>
                <RadioGroup
                    value={value.method}
                    onValueChange={(v) => onUpdate({ method: v as Payment["method"] })}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
               {/*      <div className={clsx("flex items-center gap-2 border rounded-md p-3 cursor-pointer", value.method === "card" && "border-blue-600 bg-blue-50")}>
                        <RadioGroupItem id={`${formId}-card`} value="card" />
                        <Label htmlFor={`${formId}-card`}>Credit/Debit Card</Label>
                    </div> */}
                    <div className={clsx("flex items-center gap-2 border rounded-md p-3 cursor-pointer", value.method === "cod" && "border-blue-600 bg-blue-50")}>
                        <RadioGroupItem id={`${formId}-cod`} value="cod" />
                        <Label htmlFor={`${formId}-cod`}>Cash on Delivery</Label>
                    </div>
                </RadioGroup>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="outline" onClick={onBack}>
                    Back to address
                </Button>
                <Button type="submit" disabled={!!placing}>
                    {placing ? "Placing order..." : "Place order"}
                </Button>
            </div>
        </form>
    )
}