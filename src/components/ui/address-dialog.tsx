"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import strapi from "@/sdk";
import { AddressType } from "@/types/address";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface AddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: AddressType | null;
    queryClient: any
}
const addressTemplate: Partial<AddressType> = {
    city: "",
    pincode: "",
    country: "",
    district: "",
    state: "",
    streetAddress: "",
    locality: "",
    landmark: "",
    phone: "",
    firstname: "",
    lastname: "",
}

export function AddressDialog({ open, onOpenChange, initialData, queryClient }: AddressDialogProps) {
    const [loading, setIsLoading] = useState(false)
    const isEditing = Boolean(initialData?.id);
    const { data } = useSession();
    const userDocumentId = data?.user.id;
    const verifidPhone = data?.user.identifier;
    const [form, setForm] = useState<Partial<AddressType>>(addressTemplate);

    useEffect(() => {
        setForm(addressTemplate);
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            if (isEditing && form.documentId) {
                // update address
                // Remove 'id' from form before updating
                const { id, documentId, createdAt, updatedAt, ...formWithoutId } = form;
                await strapi.update("addresses", form.documentId, {
                    ...formWithoutId,
                    phone: Number(form.phone),
                    pincode: Number(form.pincode),
                });

            } else {
                // create new address
                await strapi.create("addresses", {
                    ...form,
                    phone: Number(form.phone),
                    pincode: Number(form.pincode),
                    user: userDocumentId,
                    verfiedIdentifier: verifidPhone
                });
            }
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            onOpenChange(false);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold">
                            {isEditing ? "Edit Address" : "Add Address"}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="rounded-full p-1 hover:bg-gray-100">
                                <X className="h-5 w-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="firstname"
                                value={form.firstname ?? ""}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                name="lastname"
                                value={form.lastname ?? ""}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="locality"
                                value={form.locality ?? ""}
                                onChange={handleChange}
                                placeholder="Locality"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                value={form.country ?? ""}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                name="pincode"
                                value={form.pincode ?? ""}
                                onChange={handleChange}
                                placeholder="Pin code"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                name="state"
                                value={form.state ?? ""}
                                onChange={handleChange}
                                placeholder="state"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                        </div>

                        <input
                            type="number"
                            name="phone"
                            value={form.phone ?? ""}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full rounded-lg border px-3 py-2"
                            required
                        />

                        <input
                            type="text"
                            name="streetAddress"
                            value={form.streetAddress ?? ""}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="w-full rounded-lg border px-3 py-2"
                            required
                        />

                        {/* city + district */}
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="city"
                                value={form.city ?? ""}
                                onChange={handleChange}
                                placeholder="City"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                name="district"
                                value={form.district ?? ""}
                                onChange={handleChange}
                                placeholder="District"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                        </div>

                        <div className="mt-4 flex justify-end gap-3">
                            <Dialog.Close asChild>
                                <button
                                    disabled={loading}
                                    type="button"
                                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                disabled={loading}
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                {
                                    loading ? <> {isEditing ? "Update..." : "Add..."} </> : <> {isEditing ? "Update" : "Add"}</>
                                }
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
