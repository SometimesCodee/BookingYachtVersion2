import React, { useState, useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import './SliderImg.scss'
import { getHighestAndLowestPriceByYacht, getImagesYacht } from '../../../services/ApiServices';
import { LuShip } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { getYachtImagesApi } from '../../../redux/action/YachtImagesAction';

const SimpleSlider = ({ yacht }) => {
  const { images } = useSelector(state => state.YachtImagesReducer);
  const dispatch = useDispatch();
  const [priceData, setPriceData] = useState({});
  console.log(images)

  useEffect(() => {
    if (yacht && yacht.idYacht) {
      dispatch(getYachtImagesApi(yacht.idYacht));
      fetchPrices();
    }
  }, [yacht, dispatch]);

  const fetchPrices = async () => {
    try {
      const response = await getHighestAndLowestPriceByYacht(yacht.idYacht);
      setPriceData({ [yacht.idYacht]: response.data.data });
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  const getImageApi = `http://localhost:8080/api/customer/file/`

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
      <div className='title_page mb-4' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', color: '#0E4F4F' }}><span><LuShip color='gold' size={80}></LuShip></span> {yacht.name}</h1>
        <h3 style={{ color: '#0E4F4F', fontWeight: 'normal' }}>Price: {priceData[yacht.idYacht] ? `${priceData[yacht.idYacht].lowestPrice.toLocaleString()} - ${priceData[yacht.idYacht].highestPrice.toLocaleString()} đ` : 'Loading...'}</h3>
      </div>

      <div className='slider_page'>
        <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false} indicators={false} interval={null}>
          {images.map((image, index) => (
            <Carousel.Item key={image.idYachtImage}>
              <Image src={`${getImageApi}${image.imageYacht}`} alt={index} fluid className='img1' />
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
              const realIndex = (currentIndex + index) % image.length;
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
              src={`${getImageApi}${image.imageYacht}`}
              alt={`${getImageApi}${image.imageYacht}`}
              thumbnail
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleSlider;