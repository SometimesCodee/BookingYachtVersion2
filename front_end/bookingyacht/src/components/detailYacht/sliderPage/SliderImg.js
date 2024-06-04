// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import StikyNav from '../stickyNav/StickyNav';
// import './SliderImg.scss';
// const SimpleSlider = () => {
//     const [imageList, setImageList] = useState([]);
//     useEffect(() => {
//         fetch('https://reqres.in/api/users')
//             .then(response => response.json())
//             .then(data => {
//                 const avatars = data.data.map(user => user.avatar);
//                 setImageList(avatars);
//             });
//     }, []);

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };

//     return (
//         <div>
//             <div className='title_page'>
//                 <h2>Du thuyền Heritage Bình Chuẩn Cát Bà</h2>
//                 <h3>3,550,000 đ/khách</h3>
//             </div>
//             <div>
//                 <Slider {...settings}>
//                 {imageList.map((image, index) => (
//                     <div key={index}>
//                         <img src={image} alt={`Slide ${index + 1}`} />
//                     </div>
//                 ))}
//                 </Slider>
//             </div>

//             <div>
//                 <StikyNav />
//             </div>
//         </div>

//     );
// }

// export default SimpleSlider;
import React, { useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import './CustomSlider.scss';

const SimpleSlider = () => {
  const images = [
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/nx36g4ggepatgx23.webp', alt: 'First image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/1igusnttvx5r28wp.webp', alt: 'Second image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/63ljiq0pp8y5szs8.webp', alt: 'Third image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/o7kiablbgtnjaxwf.webp', alt: 'Fourth image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/wwd7tjmchxpz8akk.webp', alt: 'Fifth image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/wwd7tjmchxpz8akk.webp', alt: 'Sixth image' },
    // Thêm nhiều ảnh khác nếu cần
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNextThumbnails = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevThumbnails = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayedThumbnails = images.slice(currentIndex, currentIndex + 5).concat(
    images.slice(0, Math.max(0, currentIndex + 5 - images.length))
  );

  return (
    <div className="custom-slider">
      <div className='title_page'>
        <h2>Du thuyền Heritage Bình Chuẩn Cát Bà</h2>
        <h3>3,550,000 đ/khách</h3>
      </div>
      <div className='slider_page'>
        <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false} indicators={false} interval={null}>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <Image src={image.src} alt={image.alt} fluid className='img1' />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="thumbnail-container">
        {displayedThumbnails.map((image, index) => (
          <div
            className="thumbnail"
            key={index}
            onClick={() => {
              const realIndex = (currentIndex + index) % images.length;
              if (index === 0) {
                handlePrevThumbnails();
              } else if (index === displayedThumbnails.length - 1) {
                handleNextThumbnails();
              } else {
                handleThumbnailClick(realIndex);
              }
            }}
          >
            <Image
              className='img2'
              src={image.src}
              alt={image.alt}
              thumbnail
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleSlider;
