"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductSorter() {
    const [sortOption, setSortOption] = useState("featured")

    return (
        <div className="flex items-center">
            <span className="text-sm mr-2 text-muted-foreground">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

