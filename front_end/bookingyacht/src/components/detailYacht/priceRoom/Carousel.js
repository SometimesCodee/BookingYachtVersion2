import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';

const Carousel = ({ images }) => {
    return (
        <BootstrapCarousel>
            {images.map((image, index) => (
                <BootstrapCarousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`Slide ${index + 1}`}
                    />
                </BootstrapCarousel.Item>
            ))}
        </BootstrapCarousel>
    );
};

export default Carousel;
