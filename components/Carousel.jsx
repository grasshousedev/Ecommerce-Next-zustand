import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";

const Carousel = () => {
  const heroImages = [
    {
      id: 1,
      uri: banner1,
    },
    {
      id: 2,
      uri: banner2,
    },
  ];
  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        speed={800}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        }}
        className={styles.mySwiper}
      >
        {heroImages.map((HeroImage, id) => {
          return (
            <SwiperSlide key={id}>
              <Image
                src={HeroImage.uri}
                alt=""
                height={500}
                width={500}
                className={styles.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
