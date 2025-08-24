"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { AuthCard } from "@/components/auth/auth-card"
import { PhoneInput } from "@/components/auth/phone-input"
import { OtpInput } from "@/components/auth/otp-input"
import { AuthButton } from "@/components/auth/auth-button"
import { ResendTimer } from "@/components/auth/resend-timer"
import { ArrowLeft, Smartphone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"
import { sendOtp } from "@/lib/otp"

type LoginStep = "phone" | "otp"

export default function LoginPage() {
    const [step, setStep] = useState<LoginStep>("phone")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [phoneError, setPhoneError] = useState("")
    const [otpError, setOtpError] = useState("")

    const validatePhone = (phoneNumber: string): boolean => {
        if (!phoneNumber) {
            setPhoneError("Phone number is required")
            return false
        }
        if (phoneNumber.length < 10) {
            setPhoneError("Please enter a valid phone number")
            return false
        }
        setPhoneError("")
        return true
    }

    const handleSendOtp = async () => {
        if (!validatePhone(phone)) return
        setIsLoading(true)
        try {
            const res = await sendOtp(phone);
            toast(res?.message)
            setStep("otp")
        } catch (error: any) {
            const errorMessage = error?.message || "Failed to send OTP. Please try again."
            setPhoneError(errorMessage)
            toast(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        if (!otp) {
            setOtpError("Please enter the OTP")
            return
        }
        if (otp.length < 4) {
            setOtpError("Please enter a valid OTP")
            return
        }
        setIsLoading(true)
        setOtpError("")
        try {
            const res = await signIn("credentials", {
                redirect: false,
                phone,
                otp,
            });
            if (res?.ok) {
                toast("Login successful ✅");
                window.location.href = "/";
            } else {
                toast("Invalid OTP");
            }
        } catch (error: any) {
            const errorMessage = error?.message || "Failed to verify OTP. Please try again."
            setOtpError(errorMessage)
            toast(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = async () => {
        setOtp("")
        setOtpError("")
        await handleSendOtp()
    }

    const handleBackToPhone = () => {
        setStep("phone")
        setOtp("")
        setOtpError("")
    }

    return (
        <AuthCard
            title={step === "phone" ? "Welcome" : "Verify Your Phone"}
            description={
                step === "phone"
                    ? "Enter your phone number to login or sign up to your account"
                    : `We've sent a verification code to ${phone}`
            }
        >
            {step === "phone" ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full">
                        <Smartphone className="w-8 h-8 text-primary" />
                    </div>

                    <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        error={phoneError}
                        disabled={isLoading}
                        placeholder="Enter your phone number"
                    />

                    <AuthButton
                        onClick={handleSendOtp}
                        loading={isLoading}
                        loadingText="Sending OTP..."
                        disabled={!phone}
                        className="w-full"
                        size="lg"
                    >
                        Send OTP
                    </AuthButton>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>

                    <OtpInput value={otp} onChange={setOtp} error={otpError} disabled={isLoading} autoFocus length={6} />

                    <div className="space-y-4">
                        <AuthButton
                            onClick={handleVerifyOtp}
                            loading={isLoading}
                            loadingText="Verifying..."
                            disabled={!otp || otp.length < 4}
                            className="w-full"
                            size="lg"
                        >
                            Verify & Sign In
                        </AuthButton>
                        <ResendTimer onResend={handleResendOtp} disabled={isLoading} initialTime={60} />
                    </div>

                    <Button variant="ghost" onClick={handleBackToPhone} disabled={isLoading} className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Phone Number
                    </Button>
                </div>
            )}
        </AuthCard>
    )
}