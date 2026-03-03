"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const default_banner = [{
  id:1,
  url:"imageslider/slide1.png"
},{
  id:2,
  url:"imageslider/slide2.png"
},{
  id:3,
  url:"imageslider/slide3.png"
},{
  id:4,
  url:"imageslider/slide4.png"
}]

const ImageSlider = ({
  top_banners,
}: {
  top_banners: { url: string; id: number }[] | undefined | [];
}) => {
  return (
    <div className="w-full h-[30vh] md:h-fit">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className=" shadow-lg h-full"
      >
        {
    top_banners && top_banners?.length > 0 ? top_banners?.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.url}
                alt={`Slide ${banner.id}`}
                className="w-full h-full object-fill"
              />
            </SwiperSlide>
          )) : default_banner.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.url}
                alt={`Slide ${banner.id}`}
                className="w-full h-full object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default ImageSlider;
