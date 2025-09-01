"use client"

import { Badge } from "@/components/ui/badge"

type Props = {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    className?: string
}

const colors: Record<Props["status"], string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    processing: "bg-sky-100 text-sky-800 border-sky-200",
    shipped: "bg-blue-100 text-blue-800 border-blue-200",
    delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-800 border-rose-200",
}

export function OrderStatusBadge({ status, className }: Props) {
    return (
        <Badge className={`${colors[status]} ${className || ""}`} variant="outline">
            {status}
        </Badge>
    )
}
