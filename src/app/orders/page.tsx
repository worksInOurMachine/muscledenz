import { OrdersList } from "@/components/orders/orders-list"
import { fetchOrders } from "@/lib/orders"


export default async function OrdersPage() {
    let orders = [] as any
    let errorMsg: string | null = null
    try {
        orders = await fetchOrders({  })
    } catch (e: any) {
        errorMsg = e?.message || "Unable to load orders."
    }

    return (
        <main className="container h-[100vh] mx-auto max-w-5xl  p-4 md:p-6">
            <h1 className=" my-6 text-[26px] font-bold">Your Orders</h1>

            {errorMsg ? (
                <div className="mb-4">
                    <p>Could not load orders</p>
                    <p className="whitespace-pre-wrap text-sm">{errorMsg}</p>
                </div>
            ) : null}

            <OrdersList orders={orders as any} />
        </main>
    )
}