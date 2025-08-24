"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResendTimerProps {
    onResend: () => void
    initialTime?: number
    disabled?: boolean
    className?: string
}

export function ResendTimer({ onResend, initialTime = 60, disabled = false, className }: ResendTimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft])

    const handleResend = () => {
        onResend()
        setTimeLeft(initialTime)
        setIsActive(true)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className={cn("text-center", className)}>
            {timeLeft > 0 ? (
                <p className="text-sm text-muted-foreground">
                    Resend OTP in <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
                </p>
            ) : (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResend}
                    disabled={disabled}
                    className="text-primary hover:text-primary/80"
                >
                    Resend OTP
                </Button>
            )}
        </div>
    )
}