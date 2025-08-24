"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label" 
import { cn } from "@/lib/utils"

interface OtpInputProps {
    length?: number
    value: string
    onChange: (value: string) => void
    error?: string
    disabled?: boolean
    className?: string
    autoFocus?: boolean
}

export function OtpInput({
    length = 6,
    value,
    onChange,
    error,
    disabled = false,
    className,
    autoFocus = false,
}: OtpInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    // Update internal state when value prop changes
    useEffect(() => {
        const otpArray = value.split("").slice(0, length)
        const paddedOtp = [...otpArray, ...new Array(length - otpArray.length).fill("")]
        setOtp(paddedOtp)
    }, [value, length])

    // Auto-focus first input
    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [autoFocus])

    const handleChange = (index: number, digit: string) => {
        if (disabled) return

        // Only allow single digits
        const sanitizedDigit = digit.replace(/\D/g, "").slice(-1)

        const newOtp = [...otp]
        newOtp[index] = sanitizedDigit
        setOtp(newOtp)

        // Update parent component
        onChange(newOtp.join(""))

        // Auto-focus next input
        if (sanitizedDigit && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return

        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                // If current input is empty, focus previous input
                inputRefs.current[index - 1]?.focus()
            } else {
                // Clear current input
                const newOtp = [...otp]
                newOtp[index] = ""
                setOtp(newOtp)
                onChange(newOtp.join(""))
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus()
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        if (disabled) return

        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
        const pastedArray = pastedData.split("")
        const newOtp = [...new Array(length).fill("")]

        pastedArray.forEach((digit, index) => {
            if (index < length) {
                newOtp[index] = digit
            }
        })

        setOtp(newOtp)
        onChange(newOtp.join(""))

        // Focus the next empty input or the last input
        const nextEmptyIndex = newOtp.findIndex((digit) => !digit)
        const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1
        inputRefs.current[focusIndex]?.focus()
    }

    return (
        <div className={cn("space-y-3", className)}>
            <Label>Enter OTP</Label>
            <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        //@ts-ignore
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        disabled={disabled}
                        className={cn(
                            "w-12 h-12 text-center text-lg font-semibold transition-all duration-200",
                            "focus:scale-105 focus:shadow-md",
                            error && "border-destructive focus-visible:ring-destructive",
                            digit && "bg-primary/5 border-primary/20",
                        )}
                    />
                ))}
            </div>
            {error && (
                <p className="text-sm text-destructive text-center animate-in slide-in-from-bottom-1 duration-200">{error}</p>
            )}
        </div>
    )
}