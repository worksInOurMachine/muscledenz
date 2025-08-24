"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    loadingText?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    children: React.ReactNode
}

export function AuthButton({
    loading = false,
    loadingText,
    variant = "default",
    size = "default",
    children,
    disabled,
    className,
    ...props
}: AuthButtonProps) {
    return (
        <Button
            variant={variant}
            size={size}
            disabled={disabled || loading}
            className={cn(
                "transition-all duration-200 transform",
                "hover:scale-[1.02] active:scale-[0.98]",
                loading && "cursor-not-allowed",
                className,
            )}
            {...props}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? loadingText || "Loading..." : children}
        </Button>
    )
}
