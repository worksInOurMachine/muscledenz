"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label"  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMemo } from "react"

export function OrdersFilter() {
    const router = useRouter()
    const params = useSearchParams()

    const status = params.get("status") || "all"
    const payment = params.get("payment") || "all"

    const setParam = (key: string, value: string) => {
        const next = new URLSearchParams(Array.from(params.entries()))
        if (value === "all") next.delete(key)
        else next.set(key, value)
        router.push(`/orders?${next.toString()}`)
    }

    const memoStatus = useMemo(() => status, [status])
    const memoPayment = useMemo(() => payment, [payment])

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Tabs value={memoStatus} onValueChange={(v) => setParam("status", v)} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
                <Label className="text-sm">Payment</Label>
                <Select value={memoPayment} onValueChange={(v) => setParam("payment", v)}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}