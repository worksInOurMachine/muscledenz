"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
// import { categories } from "@/config/categories.config";
import { strapi } from "@/lib/strapi";
import useSWR from "swr";
import { CategoryResType } from "@/types/category";

const fetchCategories = async () => {
  try {
    const res = await strapi.find("categories", {
      populate: "*",
    });

    return res;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export function ProductSorter() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/products",
    fetchCategories
  );

  const categories: CategoryResType = data?.data || [];
//   console.log(categories);
  const [sortOption, setSortOption] = useQueryState("category");
  if (typeof window !== "undefined") {
    if (error) return <div>Failed to load categories</div>;
    if (!data) return <div>Loading categories...</div>;
  }
  return (
    <div className="flex items-center">
      <span className="text-sm mr-2 text-muted-foreground">Category:</span>
      <Select value={sortOption || ""} onValueChange={setSortOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((ct, i) => {
            return (
              <SelectItem key={i} value={`${ct?.slug}`}>
                {ct?.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
