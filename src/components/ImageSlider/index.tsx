"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  return (
    <div className="w-full h-fit">
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
            src="imageslider/slide1.png" 
            alt="Slide 1" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="imageslider/slide2.png" 
            alt="Slide 2" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="imageslider/slide3.png" 
            alt="Slide 3" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="imageslider/slide4.png" 
            alt="Slide 3" 
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
