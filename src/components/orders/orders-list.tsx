"use client"

import Link from "next/link"
import { OrderCard } from "./order-card"
import type { OrderResType } from "@/types/order"
import { useAppDispatch } from "@/redux/hook"
import { setActiveLink } from "@/redux/slices/active-link-slice"

export function OrdersList({ orders }: { orders: OrderResType[] }) {
    const dispatch = useAppDispatch()
    const updateActiveLinks = () => {
        dispatch(setActiveLink("/products"))
    }
    if (!orders?.length) {
        return <div className="flex gap-4 justify-center items-center flex-col"><p className=" text-[18px]">No orders found.</p>
            <p className=" text-[24px] font-bold">Buy Your First Product</p>
            <Link onClick={updateActiveLinks} href={"/products"} className=" bg-black py-2 px-4 rounded-[5px]  mt-5 text-white text-[20px] font-bold">Products</Link>
        </div>
    }

    return (
        <div className="flex  flex-wrap gap-4">
            {orders.map((o) => (
                <OrderCard key={o.id} order={o} />
            ))}
        </div>
    )
}
