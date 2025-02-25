"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  return (
    <div className="w-full h-[50%] md:h-[400px] lg:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg h-full"
      >
        <SwiperSlide>
          <img 
            src="https://www.avvatarindia.com/images/banners/5669346991736154896.jpg" 
            alt="Slide 1" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="https://www.avvatarindia.com/images/banners/5669346991736154896.jpg" 
            alt="Slide 2" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="https://www.avvatarindia.com/images/banners/5669346991736154896.jpg" 
            alt="Slide 3" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
