import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { BRANDS } from "../../utils/consts";
import { motion } from "framer-motion";

import "swiper/swiper.min.css";
import Link from "next/link";

const BrandsSwiper = ({ className }) => {
  return (
    <Swiper
      // spaceBetween={100}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 1500,
      }}
      className={`brands-swiper ${className}`}
    >
      {BRANDS.map(({ title, href, img }, i) => (
        <SwiperSlide key={i}>
          <Link target="_blank" rel="noopener noreferrer" href={href} className="img-wrapper">
            <Image
              src={img}
              alt={title}
              width={80}
              height={80}
              className="cursor-pointer object-contain  transition-all duration-300 hover:scale-105 hover:grayscale-0"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandsSwiper;
