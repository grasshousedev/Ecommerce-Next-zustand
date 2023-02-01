import styles from "../styles/Carousel.module.css"
import Image from "next/image"
import {urlFor} from "../lib/client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';


const Carousel = ({heroImages}) => {
    
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

                        {heroImages.map((HeroImage, id) =>{
                            const src = urlFor(HeroImage.image).url()
                            return(
                                <SwiperSlide key={id}>
                                        <Image 
                                        loader= {() => src} 
                                        src={src}
                                        alt=""
                                        height={500}
                                        width={500}
                                        className={styles.image}
                                        />

                                </SwiperSlide> 

                                )   
                                })} 

                    </Swiper> 
                         
        </div>
     );
}
 
export default Carousel;