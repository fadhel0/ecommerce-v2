'use client';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const CarouselComp = () => {
  return (
    <>
      <div className="max-w-fit mx-auto">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showThumbs={false}
        >
          <div>
            <Image
              src="/images/banner/1.png"
              alt="banner1"
              width={2000}
              height={2000}
            />
          </div>
          <div>
            <img src="/images/banner/2.png" alt="banner2" />
          </div>
          <div>
            <img src="/images/banner/3.png" alt="banner3" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default CarouselComp;
