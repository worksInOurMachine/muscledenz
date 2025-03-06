'use client'
import ScrollRevealAnimation from '@/components/AnimatedComponent/ScrollRevealAnimation';
import { ImageLayoutGrid } from '@/components/ImageGridLayout/ImageGridLayout';
import ImageSlider from '@/components/ImageSlider';
import ProductListings from '@/components/Product';
import TestimonialsCarousel from '@/components/Testimonials/TestimonialsCarousel';
import React from 'react';
const SlidingText =React.lazy(() => import('@/components/AnimatedComponent/SlidingText'))


export default function Home() {
  return (
    <div className="min-w-full py-5 space-y-5 min-h-full p-1">
      <ImageSlider />
      <div id="training-programs" className="w-full space-y-0">

      <ScrollRevealAnimation
          baseOpacity={0}
          enableBlur={true}
          baseRotation={8}
          textClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 font-bold text-center"
            rotationEnd="bottom bottom"
            wordAnimationEnd="bottom bottom"

        >
          Our Training Programs
        </ScrollRevealAnimation>
        <ImageLayoutGrid />
      </div>

      <div className='space-y-10'>
        <ProductListings title="Trending Products" collectionType="trending" />
        <ProductListings title="Popular Products" collectionType="popular" />
        <ProductListings title="Just Launched" collectionType="just-launched" />
      </div>
      <br />
      <div id="testimonials" className='py-2 sm:py-5 md:py-10 md:space-y-10 sm:p bg-slate-100 '>
      <ScrollRevealAnimation
          baseOpacity={0}
          enableBlur={true}
          baseRotation={8}
          textClassName="text-2xl sm:text-4xl lg:text-5xl text-gray-700 font-bold text-center"
            rotationEnd="bottom bottom"
            wordAnimationEnd="bottom bottom"

        >
          What Our Customer's Say
        </ScrollRevealAnimation>
        <TestimonialsCarousel/>


      </div>
      <SlidingText velocity={100}  className='text-black/60' texts={Array(1).fill([<h1 key={1} className='w-full'> MUSCLE<span className='text-red-600'>DENZ</span>&nbsp;|&nbsp;  </h1>])} />
     
    </div>
  );
}
