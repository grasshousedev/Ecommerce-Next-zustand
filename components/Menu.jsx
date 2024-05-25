import styles from "../styles/Menu.module.css";
import Image from "next/image";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  UilAngleRight,
  UilMessage,
  UilWhatsapp,
} from "@iconscout/react-unicons";
import chef from "../assets/chef.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Menu = ({ food, foodCategories }) => {
  //   console.log(food);
  //   console.log(foodCategories);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const updateSlidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1000) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 800) {
        setSlidesPerView(2.5);
      } else if (window.innerWidth >= 600) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1.5);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateSlidesPerView);
      return () => {
        window.removeEventListener("resize", updateSlidesPerView);
      };
    }
  }, []);

  const [menuData, setMenuData] = useState(food);
  const [activeId, setActiveId] = useState(0);

  const onClickHandler = (id, categoryId) => {
    filter(categoryId);
    setActiveId(id);
  };
  const filter = (categoryId) => {
    setMenuData(food.filter((item) => item.category.id == categoryId));
  };

  return (
    <div className={styles.container} id="menu">
      <div className={styles.heading}>
        <span>OUR MENU</span>
        <span>Menu that always</span>
        <span>Make you drool</span>
      </div>

      {/* FOOD CATEGORIES AND MENU */}
      <div className={styles.products}>
        <ul className={styles.sidebar}>
          {foodCategories.map((category, id) => {
            return (
              <li
                key={id}
                className={
                  activeId == id
                    ? `${styles.row} ${styles.active}`
                    : `${styles.row}`
                }
                onClick={() => onClickHandler(id, category.id)}
              >
                <div className={styles.rowTitle}>{category.name}</div>
              </li>
            );
          })}
        </ul>

        <div className={styles.menu}>
          {menuData.map((dish, id) => {
            return (
              <div key={id} className={styles.dish}>
                <div className={styles.webMenu}>
                  <Link href={`./food/${dish.id}`}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={`data:image/jpeg;base64,${dish.image}`}
                        alt=""
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                  </Link>
                  <div className={styles.details}>
                    <div className={styles.name}>
                      <span>{dish.name}</span>
                    </div>
                    <span>
                      <span
                        style={{ color: "var(--themeRed)", fontSize: "1.2rem" }}
                      >
                        {" "}
                        $
                      </span>
                      {dish.price[0]}
                    </span>

                    <Link href={`./food/${dish.id}`}>
                      <div className={styles.order}>
                        <div>Order Now</div>
                        <UilAngleRight />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <Swiper
            modules={[Navigation]}
            navigation
            speed={800}
            spaceBetween={100}
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 2000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            }}
            className={styles.mySwiper}
          >
            {menuData.map((dish, id) => {
              return (
                <SwiperSlide key={id} className={styles.slide}>
                  <div className={styles.webMenu}>
                    <Link href={`./food/${dish.id}`}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={`data:image/jpeg;base64,${dish.image}`}
                          alt=""
                          objectFit="cover"
                          layout="fill"
                        />
                      </div>
                    </Link>

                    <div className={styles.details}>
                      <div className={styles.name}>
                        <span>{dish.name}</span>
                      </div>
                      <span>
                        <span
                          style={{
                            color: "var(--themeRed)",
                            fontSize: "1.2rem",
                          }}
                        >
                          USD{" "}
                        </span>
                        {dish.price[0]}
                      </span>

                      <Link href={`./food/${dish.id}`}>
                        <div className={styles.order}>
                          <div>Order Now</div>
                          <UilAngleRight />
                        </div>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className={styles.heading} id="contact">
        <span>GET IN TOUCH</span>
        <span>Question or feedback?</span>
        <span>We'd love to hear from you</span>
      </div>
      {/* <div>
                <input type="email" className={styles.email}  placeholder="Email Address" />
                <UilMessage className={styles.message}/>
               
            </div> */}

      <Link href="https://api.whatsapp.com/send/?phone=243971534162">
        <a target="_blank" rel="noopener noreferrer">
          <div className={styles.contactUs}>
            <div>
              <UilWhatsapp color="white" />
            </div>

            <span>Click to chat</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Menu;
