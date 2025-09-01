import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "./order-status-badge"
import type { OrderResType } from "@/types/order"
 

export function OrderCard({ order }: { order: OrderResType }) {
    const thumb = order.product?.thumbnail?.url || ""
    return (
        <Card className="overflow-hidden max-w-[300px]">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-base md:text-lg text-pretty">{order.product?.name}</CardTitle>
                <OrderStatusBadge status={order.orderStatus} />
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-muted">
                        {thumb ? (
                            <Image
                                src={thumb || "/placeholder.svg"}
                                alt={order.product?.name || "Product image"}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        ) : (
                            <div className="h-full w-full bg-muted" aria-hidden />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-2">{order.product?.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm">
                                Qty: <strong>{order.quantity}</strong>
                            </span>
                            <span className="text-sm">
                                Amount: <strong>₹{order.amount}</strong>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={`/orders/${order.documentId || order.id}`}
                        className="text-sm font-medium text-emerald-600 hover:underline"
                    >
                        View details
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}