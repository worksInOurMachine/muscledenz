"use client"


import Loading from "@/app/loading";
import { AddressDialog } from "@/components/ui/address-dialog";
import { Separator } from "@/components/ui/separator";
import { useAddresses } from "@/hooks/useAddresses";
import strapi from "@/sdk";
import { AddressType } from "@/types/address";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type AddressSelectorProps = {
  setStep:any,
  setAddressId:any,
  selectedId:string | null
}

export function AddressSelector({ setStep, setAddressId, selectedId }: AddressSelectorProps) {
    const { addressesQuery } = useAddresses();
 
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<AddressType | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient();
    if (addressesQuery.isLoading) return <p><Loading /></p>;
    if (addressesQuery.isError) return <p>Error fetching addresses</p>;

    const addresses = addressesQuery.data ?? [] as any;
    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true)
            await strapi.delete("addresses", id)
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            if (selectedId === id) {
                setAddressId(null)
            }
            toast.success("Address deleted")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-pretty">Select a saved address</h3>
                    <p className="text-sm text-muted-foreground">Use an existing address or add a new one.</p>
                </div>
            </div>
            <div className="p-6 max-w-3xl mx-auto">
              

                {/* Address List */}
                <div className="space-y-3">
                    {addresses.map((addr: any) => (
                        <div
                            key={addr.id}
                            className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer ${selectedId === addr.documentId ? "border-blue-600 bg-blue-50" : "border-gray-300"
                                }`}
                            onClick={() => setAddressId(addr.documentId)}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selectedId === addr.documentId}
                                    onChange={() => {setAddressId(addr.documentId)}}
                                    className="mt-1"
                                />
                                <div>
                                    <p className="font-medium">
                                        {addr.firstname} {addr.lastname} — {addr.phone}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {addr.streetAddress}, {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(addr);
                                    setOpen(true);
                                }}
                                className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleDelete(addr.documentId)
                                }}
                                disabled={isLoading}
                                className="rounded-lg disabled:opacity-10 border px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    {/* Add new address */}
                    <button
                        type="button"
                        onClick={() => {
                            setEditing(null);
                            setOpen(true);
                        }}
                        className="w-full border-2 border-dashed rounded-lg py-3 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                    >
                        + Add New Address
                    </button>
                </div>

                <AddressDialog queryClient={queryClient} open={open} onOpenChange={setOpen} initialData={editing} />

                {/* Continue */}
                <div className="mt-6">
                    <button
                        disabled={!selectedId}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
                        onClick={()=>setStep("payment")}
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>

            <Separator />
        </div>
    )
}


