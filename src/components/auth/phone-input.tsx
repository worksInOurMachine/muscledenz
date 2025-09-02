"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CountryCode {
    code: string
    country: string
    flag: string
}

const countryCodes: CountryCode[] = [
    { code: "+91", country: "IN", flag: "🇮🇳" },
]

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    error?: string
    disabled?: boolean
    placeholder?: string
    className?: string
}

export function PhoneInput({
    value,
    onChange,
    error,
    disabled = false,
    placeholder = "Enter your phone number",
    className,
}: PhoneInputProps) {
    const [countryCode, setCountryCode] = useState("+91")
    const [phoneNumber, setPhoneNumber] = useState("")

    // Parse existing value on mount
    useEffect(() => {
        if (value) {
            const country = countryCodes.find((c) => value.startsWith(c.code))
            if (country) {
                setCountryCode(country.code)
                setPhoneNumber(value.slice(country.code.length))
            } else {
                setPhoneNumber(value)
            }
        }
    }, [])

    // Update parent when values change
    useEffect(() => {
        const fullNumber = phoneNumber ? phoneNumber /* `${countryCode}${phoneNumber}` */ : ""
        onChange(fullNumber)
    }, [countryCode, phoneNumber, onChange])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, "") // Only allow digits
        setPhoneNumber(input)
    }

    return (
        <div className={cn("space-y-2 mb-4", className)}>
           {/*  <Label htmlFor="phone-input">Phone Number</Label> */}
            <div className="flex gap-2 mb-4">
                <Select value={countryCode} onValueChange={setCountryCode} disabled={disabled}>
                    <SelectTrigger className="w-24 shrink-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {countryCodes.map((country) => (
                            <SelectItem key={`${country.code}-${country.country}`} value={country.code}>
                                <span className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.code}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                    id="phone-input"
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "flex-1 transition-all duration-200",
                        error && "border-destructive focus-visible:ring-destructive",
                    )}
                />
            </div>
            {error && <p className="text-sm text-destructive animate-in slide-in-from-left-1 duration-200">{error}</p>}
        </div>
    )
}