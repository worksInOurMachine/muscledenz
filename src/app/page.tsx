'use client'
import { ImageLayoutGrid } from '@/components/ImageGridLayout/ImageGridLayout';
import ImageSlider from '@/components/ImageSlider';
import ProductListings from '@/components/Product';
import BlurText from '@/components/ui/Heading';
import React from 'react';
const SlidingText =React.lazy(() => import('@/components/AnimatedComponent/SlidingText'))


export default function Home() {
  return (
    <div className="min-w-full py-5 space-y-10 min-h-full p-2">
      
      <ImageSlider />

      <div id="training-programs" className="w-full">
        <BlurText
          text="Our Training Programs"
          delay={50}
          animateBy="words"
          direction="bottom"
          className="text-black align-center text-4xl opacity-80 justify-center w-full text-center font-display font-bold md:text-6xl"
        />
        <ImageLayoutGrid />
      </div>

      <div className='space-y-10'>
        <ProductListings title="Trending Products" collectionType="trending" />
        <ProductListings title="Popular Products" collectionType="popular" />
        <ProductListings title="Just Launched" collectionType="just-launched" />
      </div>
      <SlidingText velocity={100}  className='text-black/60' texts={Array(1).fill([<h1 key={1} className='w-full'> MUSCLE<span className='text-red-600'>DENZ</span>&nbsp;|&nbsp;  </h1>])} />
    </div>
  );
}
