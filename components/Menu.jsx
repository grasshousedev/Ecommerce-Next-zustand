import styles from "../styles/Menu.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UilAngleRight, UilWhatsapp } from "@iconscout/react-unicons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useData } from "../Contexts/DataContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Menu = () => {
  const { food, foodCategories, loading } = useData();
  const [menuData, setMenuData] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    setMenuData(food);
  }, [food]);

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

      <div className={styles.products}>
        <ul className={styles.sidebar}>
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <li key={idx} className={styles.row}>
                  <Skeleton width={100} height={30} />
                </li>
              ))
            : foodCategories.map((category, id) => (
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
              ))}
        </ul>

        <div className={styles.menu}>
          {menuData.length === 0
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className={styles.dish}>
                  <div className={styles.webMenu}>
                    <div className={`${styles.imageWrapper} skeleton-image`}>
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className={`${styles.details} skeleton-details`}>
                      <Skeleton
                        width={70}
                        height={20}
                        className="skeleton-text"
                      />
                      <Skeleton
                        width={30}
                        height={20}
                        className="skeleton-text"
                      />
                      <div className={`${styles.order} skeleton-order`}>
                        <Skeleton width="100%" height="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : menuData.map((dish, id) => (
                <div key={id} className={styles.dish}>
                  <div className={styles.webMenu}>
                    <Link href={`./food/${dish.id}`}>
                      <div className={styles.imageWrapper}>
                        {loading ? (
                          <Skeleton width="100%" height="100%" />
                        ) : (
                          <Image
                            src={`data:image/jpeg;base64,${dish.image}`}
                            alt={dish.name}
                            objectFit="cover"
                            layout="fill"
                          />
                        )}
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
              ))}

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
            {menuData.length === 0
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <SwiperSlide key={idx} className={styles.slide}>
                    <div className={styles.webMenu}>
                      <div className={`${styles.imageWrapper} skeleton-image`}>
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className={`${styles.details} skeleton-details`}>
                        <Skeleton
                          width={70}
                          height={20}
                          className="skeleton-text"
                        />
                        <Skeleton
                          width={30}
                          height={20}
                          className="skeleton-text"
                        />
                        <div className={`${styles.order} skeleton-order`}>
                          <Skeleton width="100%" height="100%" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : menuData.map((dish, id) => (
                  <SwiperSlide key={id} className={styles.slide}>
                    <div className={styles.webMenu}>
                      <Link href={`./food/${dish.id}`}>
                        <div className={styles.imageWrapper}>
                          {loading ? (
                            <Skeleton width="100%" height="100%" />
                          ) : (
                            <Image
                              src={`data:image/jpeg;base64,${dish.image}`}
                              alt={dish.name}
                              objectFit="cover"
                              layout="fill"
                            />
                          )}
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
                ))}
          </Swiper>
        </div>
      </div>

      <div className={styles.heading} id="contact">
        <span>GET IN TOUCH</span>
        <span>Question or feedback?</span>
        <span>We'd love to hear from you</span>
      </div>

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
