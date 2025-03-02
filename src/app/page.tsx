'use client'
import { ImageLayoutGrid } from '@/components/ImageGridLayout/ImageGridLayout';
import ImageSlider from '@/components/ImageSlider';
import ProductListings from '@/components/Product';
import BlurText from '@/components/ui/Heading';

export default function Home() {
  return (
    <div className="min-w-full py-5 space-y-5 min-h-full p-2">
      <ImageSlider />

      <div id="training-programs" className='w-full'>
        {/* fix a type error inside blurtext */}
        <BlurText text="Our Training Programs"
          delay={50}
          animateBy="words"
          direction="bottom"
          className="text-black align-center text-4xl opacity-[.8] justify-center w-full text-center font-display font-bold md:text-6xl"
        />
        <ImageLayoutGrid />
      </div>


      <div className=''>
        <ProductListings title="Trending Products" collectionType={'trending'}/>
        <ProductListings title="Popular Products" collectionType={'popular'}/>
        <ProductListings title="Just Launched" collectionType={'just-launched'}/>

      </div>



    </div>
  );
}
