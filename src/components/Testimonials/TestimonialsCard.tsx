import { CheckCircle2 } from "lucide-react"
import { TestimonialType } from "@/types/testimonials"

export default function TestimonialCard({
  name,
  stars = 5,
  description,
}: TestimonialType) {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto card-premium">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
          <img
            src={"/profile.jpg"}
            alt={`${name}'s profile picture`}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <h3 className="font-bold text-base text-foreground">{name}</h3>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-success uppercase tracking-wider">
            <CheckCircle2 size={12} />
            <span>Verified Customer</span>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < stars ? "text-amber-400" : "text-border"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {/* @ts-ignore */}
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mt-4 text-muted-foreground text-sm leading-relaxed">
        &ldquo;{description}&rdquo;
      </blockquote>
    </div>
  )
}
