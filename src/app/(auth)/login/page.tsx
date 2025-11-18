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
import strapi from "@/sdk"
import { Input } from "@/components/ui/input"

type LoginStep = "phone" | "otp"

export default function LoginPage() {
    const [step, setStep] = useState<LoginStep>("phone")
    const [identifier, setIdentifier] = useState("")
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [phoneError, setPhoneError] = useState("")
    const [otpError, setOtpError] = useState("")

    const validatePhone = (phoneNumber: string): boolean => {
        if (!phoneNumber) {
            setPhoneError("Email is required")
            return false
        }
        if (phoneNumber.length < 10) {
            setPhoneError("Please enter a valid email")
            return false
        }
        setPhoneError("")
        return true
    }

    const handleSendOtp = async () => {
        if (!validatePhone(identifier)) return
        setIsLoading(true);
        try {
            const users = await strapi.find('users', {
                filters: { identifier: { $eq: identifier } },
                fields: ["id"]
            }) as any;
            if (!users || !users?.length) {
                toast.error("Email not registered please create new account");
                setIsLoading(false);
                return;
            }
            const res = await sendOtp(identifier);
            toast.success(res?.message)
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
                identifier,
                otp
            });
            if (res?.ok) {
                toast.success("Login successful");
                const redirectRoute = JSON.parse(localStorage.getItem("redirectRoute")!)! || "/";
                localStorage.removeItem("redirectRoute");
                window.location.href = redirectRoute;
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
            title={step === "phone" ? "Welcome" : "Verify Your Email"}
            description={
                step === "phone"
                    ? "Enter your email to login to your account"
                    : `We've sent a verification code to ${identifier}`
            }
        >
            {step === "phone" ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full">
                        <Smartphone className="w-8 h-8 text-primary" />
                    </div>

                    {/*   <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        error={phoneError}
                        disabled={isLoading}
                        placeholder="Enter your phone number"
                        className="mb-4"
                    /> */}
                    <Input
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter Your Email"
                        disabled={isLoading}
                        className="mb-4"
                        type="email"
                        required
                    />
                    <Link href={"/signup"} className=" underline p-4 text-end w-full text-blue-500">Create new account</Link>
                    <AuthButton
                        onClick={handleSendOtp}
                        loading={isLoading}
                        loadingText="Sending OTP..."
                        disabled={!identifier}
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