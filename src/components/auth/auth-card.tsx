"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AuthCardProps {
    title: string
    description?: string
    children: React.ReactNode
    className?: string
}

export function AuthCard({ title, description, children, className }: AuthCardProps) {
    return (
        <div className="min-h-[88vh] flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
            <Card
                className={cn(
                    "w-full max-w-md shadow-xl border-0 bg-card/95 backdrop-blur-sm",
                    "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
                    className,
                )}
            >
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
                    {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-6">{children}</CardContent>
            </Card>
        </div>
    )
}