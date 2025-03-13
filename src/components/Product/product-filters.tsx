"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "home", label: "Home" },
    { id: "office", label: "Office" },
    { id: "kitchen", label: "Kitchen" },
    { id: "clothing", label: "Clothing" },
]

const brands = [
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "sony", label: "Sony" },
    { id: "lg", label: "LG" },
    { id: "bose", label: "Bose" },
]

const ratings = [
    { id: "4-up", label: "4 Stars & Up" },
    { id: "3-up", label: "3 Stars & Up" },
    { id: "2-up", label: "2 Stars & Up" },
    { id: "1-up", label: "1 Star & Up" },
]

export default function ProductFilters() {
    const [priceRange, setPriceRange] = useState([0, 500])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<string[]>([])

    const handleCategoryChange = (id: string) => {
        setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const handleBrandChange = (id: string) => {
        setSelectedBrands((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const handleRatingChange = (id: string) => {
        setSelectedRatings((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const clearAllFilters = () => {
        setPriceRange([0, 500])
        setSelectedCategories([])
        setSelectedBrands([])
        setSelectedRatings([])
    }

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedBrands.length > 0 ||
        selectedRatings.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 500

    return (
        <div className="bg-card rounded-lg border p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
                        <X className="h-3 w-3 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            <Accordion type="multiple" defaultValue={["price", "category", "brand", "rating"]} className="space-y-2">
                <AccordionItem value="price" className="border-b">
                    <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-2 px-1">
                            <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
                            <div className="flex justify-between mt-2 text-sm">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="category" className="border-b">
                    <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`category-${category.id}`}
                                        checked={selectedCategories.includes(category.id)}
                                        onCheckedChange={() => handleCategoryChange(category.id)}
                                    />
                                    <label
                                        htmlFor={`category-${category.id}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="brand" className="border-b">
                    <AccordionTrigger className="text-sm font-medium">Brand</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {brands.map((brand) => (
                                <div key={brand.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`brand-${brand.id}`}
                                        checked={selectedBrands.includes(brand.id)}
                                        onCheckedChange={() => handleBrandChange(brand.id)}
                                    />
                                    <label
                                        htmlFor={`brand-${brand.id}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {brand.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rating" className="border-b-0">
                    <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {ratings.map((rating) => (
                                <div key={rating.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`rating-${rating.id}`}
                                        checked={selectedRatings.includes(rating.id)}
                                        onCheckedChange={() => handleRatingChange(rating.id)}
                                    />
                                    <label
                                        htmlFor={`rating-${rating.id}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {rating.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

