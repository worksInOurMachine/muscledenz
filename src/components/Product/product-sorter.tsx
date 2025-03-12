"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQueryState } from 'nuqs'
import { categories } from "@/config/categories.config"
export function ProductSorter() {
    const [sortOption, setSortOption] = useQueryState('category')

    return (
        <div className="flex items-center">
            <span className="text-sm mr-2 text-muted-foreground">Category:</span>
            <Select value={sortOption || ""} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map((ct,i) => {
                            return <SelectItem key={i} value={`${ct.slug}`}>{ct.name}</SelectItem>
                        })
                    }

                </SelectContent>
            </Select>
        </div>
    )
}

