import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "./order-status-badge"
import type { OrderResType } from "@/types/order"


export function OrderDetails({ order }: { order: OrderResType }) {
    const product = order.product
    const thumb = product?.thumbnail?.url || "";
    const address = order.address

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-pretty">Order #{order.id}</CardTitle>
                    <OrderStatusBadge status={order.orderStatus} />
                </CardHeader>
                <Separator />
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                            {thumb ? (
                                <Image
                                    src={thumb || "/placeholder.svg"}
                                    alt={product?.name || "Product image"}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-muted" aria-hidden />
                            )}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-base font-medium text-pretty">{product?.name}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{product?.description}</p>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    Quantity: <strong>{order.quantity}</strong>
                                </div>
                                <div>
                                    Amount: <strong>₹{order.amount}</strong>
                                </div>
                                <div>
                                    Payment: <strong>{order.paymentMethod}</strong>
                                </div>
                                <div>
                                    Status: <strong>{order.paymentStatus}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                        <div>Net Price</div>
                        <div className="text-right">₹{product?.price}</div>
                        <div>Discount</div>
                        <div className="text-right">{product?.discount}%</div>
                        <div>Payable Amount</div>
                        <div className="text-right">₹{order.amount}</div>
                        <div>Category</div>
                        <div className="text-right">{product?.category?.name}</div>
                        <div>Collection</div>
                        <div className="text-right">{product?.collectionType}</div>
                        <div>Type</div>
                        <div className="text-right">{product?.isVeg ? "Veg" : "Non-Veg"}</div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-2 space-y-2 text-sm">
                    <div className="mt-1 p-4">
                        <div className="text-sm space-y-2">
                            <p>
                                <span className="font-medium">Name:</span> {address.firstname}{" "}
                                {address.lastname}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span> {address.phone}
                            </p>
                            <p>
                                <span className="font-medium">Street:</span> {address.streetAddress}
                            </p>
                            <p>
                                <span className="font-medium">Locality:</span> {address.locality}
                            </p>
                            {address.landmark && (
                                <p>
                                    <span className="font-medium">Landmark:</span> {address.landmark}
                                </p>
                            )}
                            <p>
                                <span className="font-medium">District:</span> {address.district}
                            </p>
                            <p>
                                <span className="font-medium">City:</span> {address.city}
                            </p>
                            <p>
                                <span className="font-medium">State:</span> {address.state}
                            </p>
                            <p>
                                <span className="font-medium">Country:</span> {address.country}
                            </p>
                            <p>
                                <span className="font-medium">Pincode:</span> {address.pincode}
                            </p>
                            <p>
                                <span className="font-medium">Verified Phone or Email:</span> {address.verfiedIdentifier}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
