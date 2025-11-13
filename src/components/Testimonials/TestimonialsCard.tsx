import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { TestimonialType } from "@/types/testimonials"

export default function TestimonialCard({
  name,
  stars = 5, 
  description,
}: TestimonialType) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto transition-transform transform hover:scale-[1.02]">
      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-300">
          <img
            src={"/profile.jpg"}
            alt={`${name}'s profile picture`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        {/* Name & Title */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl text-gray-900">{name}</h3>
         {/*  <p className="text-gray-600 text-sm sm:text-base">{profession}</p> */}
          {true && (
            <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600 mt-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verified Customer</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < stars ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial */}
      <blockquote className="mt-3 text-gray-800 italic text-sm sm:text-base leading-relaxed">
        "{description}"
      </blockquote>
    </div>
  )
}
