import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { TestimonialType } from "@/types/testimonials"

export default function TestimonialCard({
  name = "Gautam Hasija",
  title = "Fitness Influencer",
  avatarUrl = "/placeholder.svg?height=120&width=120",
  isVerified = true,
  rating = 5,
  testimonial = "I've tried a lot of online supplement stores, but Nutrabay.com stands out for their exceptional customer service and high-quality products. I appreciate that I can trust the authenticity of the products I receive and that the shipping is lightning-fast.",
}: TestimonialType) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg w-[300px]">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-purple-100">
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt={`${name}'s profile picture`}
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
          </div>
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-purple-200 rounded-full p-0.5">
              <div className="bg-white rounded-full p-0.5">
                <div className="bg-purple-200 rounded-full">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="text-gray-700">{title}</p>
          {isVerified && (
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Verified customer</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-gray-800">"{testimonial}"</blockquote>
    </div>
  )
}

