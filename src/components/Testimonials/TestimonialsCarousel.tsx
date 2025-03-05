import React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import TestimonialCard from "./TestimonialsCard"
import { testimonials } from "@/config/testimonials.config"

function TestimonialsCarousel() {
  return (
    <div className="w-full mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[
          Autoplay({
            delay: 2000, // Smooth autoplay timing
          }),
        ]}
        className="w-full mx-auto"
      >
        <CarouselContent className="flex items-center">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="basis-[100%] sm:basis-[60%] md:basis-[50%] lg:basis-[33.33%] xl:basis-[25%] flex justify-center"
            >
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}

        </CarouselContent>
         {/* <CarouselPrevious />
                <CarouselNext /> */}
      </Carousel>
    </div>
  )
}

export default TestimonialsCarousel
