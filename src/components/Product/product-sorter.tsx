"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/config/categories.config"
import { useQueryState } from 'nuqs'
import { Button } from "../ui/button"
export function ProductSorter() {
    const [sortOption, setSortOption] = useQueryState('category')
    const [q, setQ] = useQueryState('query')

    const handleClear = () => {
        setSortOption("");
        setQ("")
    }

    return (
        <div className="flex items-center  gap-1">
            <Select value={sortOption || ""} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map((ct, i) => {
                            return <SelectItem key={i} value={`${ct.slug}`}>{ct.name}</SelectItem>
                        })
                    }
                </SelectContent>
            </Select>
            <Button onClick={handleClear}>All</Button>
        </div>
    )
}

