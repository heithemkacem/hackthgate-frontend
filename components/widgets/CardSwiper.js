import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CardSwiper = ({ data, delay }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay,
        }}
        className={`login-swiper`}
      >
        {data.map(({ title, desc, img }, i) => (
          <SwiperSlide key={i}>
            <div
              style={{
                width: "250px",
                height: "250px",
              }}
              className="relative mx-auto"
            >
              <Image
                src={img}
                alt={title}
                fill
                className=" cursor-pointer object-cover  transition-all duration-300 hover:scale-105 hover:grayscale-0"
              />
            </div>
            <h2 className="mt-8 text-xl tracking-wide">{title}</h2>
            <p className="mt-4 text-sm opacity-40">{desc}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CardSwiper;
