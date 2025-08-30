"use client";

import { useQuery } from "@tanstack/react-query";

import strapi from "@/sdk";
import { AddressType } from "@/types/address";
import { useSession } from "next-auth/react";

export const useAddresses = () => {
  const { data } = useSession();
  const userDocumentId = data?.user.id;
  // ✅ Fetch addresses
  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await strapi.find<AddressType[]>("addresses", {
        // Only fetch addresses for the current user
        filters: {
          user: userDocumentId
            ? { documentId: { $eq: userDocumentId } }
            : undefined,
        },
      });
      return res.data;
    },
  });

  return { addressesQuery };
};
