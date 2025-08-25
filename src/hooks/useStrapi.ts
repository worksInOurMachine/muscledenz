// hooks/useStrapi.ts
import strapi from "@/sdk";
import { useQuery } from "@tanstack/react-query";
import type { StrapiResponse } from "@/lib/strapi-client";

type QueryOptions = {
  populate?: string | string[];
  pagination?: { page: number; pageSize: number };
  filters?: Record<string, any>;
  sort?: string | string[];
};

const fetchStrapiData = async <T>(
  collection: string,
  query?: QueryOptions
): Promise<StrapiResponse<T>> => {
  const res = await strapi.find(collection, query);
  return res as StrapiResponse<T>; // Strapi returns { data, meta }
};

export function useStrapi<T = any>(
  collection: string,
  query?: QueryOptions,
  queryKey?: string[]
) {
  return useQuery<StrapiResponse<T>>({
    queryKey: queryKey || [collection, query],
    queryFn: () => fetchStrapiData<T>(collection, query),
  });
}
