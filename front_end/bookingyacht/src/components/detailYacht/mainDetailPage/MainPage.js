import React, { useEffect, useState } from 'react';
import RoomSelection from '../priceRoom/RoomSelection';
import Rating from '../rating/Rating';
import Schedule from '../scheduleDetail/Schedule';
import SectionHeader from '../sectionHeader/SectionHeade';
import SimpleSlider from '../sliderPage/SliderImg';
import './MainPage.scss';


const MainPage = () =>{
    const [currentSection, setCurrentSection] = useState('');
    
    useEffect(() => {
        const handleScroll = () => {
          const sections = document.querySelectorAll('.content-section-sticky');
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
              setCurrentSection(section.getAttribute('id'));
            }
          });
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className="StickyNav">
          <nav className="navbar-sticky">
            <a href="#title" className={currentSection === 'title'? 'active' : ''}>Đầu trang</a>
            <a href="#features" className={currentSection === 'features' ? 'active' : ''}>Đặc điểm</a>
            <a href="#rooms" className={currentSection === 'rooms' ? 'active' : ''}>Phòng & giá</a>
            <a href="#about" className={currentSection === 'about' ? 'active' : ''}>Giới thiệu</a>
            <a href="#rules" className={currentSection === 'rules' ? 'active' : ''}>Quy định</a>
            <a href="#reviews" className={currentSection === 'reviews' ? 'active' : ''}>Đánh giá</a>
          </nav>
  
          <div id="title" className="content-section-sticky1">
            <SimpleSlider/>
          </div>
          <div id="features" className="content-section-sticky2">
              <SectionHeader/>
            {/* <h2>Đặc điểm</h2>
            <p>Nội dung cho Đặc điểm...</p> */}
          </div>
    
          <div id="rooms" className="content-section-sticky3">
          <RoomSelection/>
            {/* <h2>Phòng & giá</h2>
            <p>Nội dung cho Phòng & giá...</p> */}
          </div>
    
          <div id="about" className="content-section-sticky4">
            <h2>Giới thiệu</h2>
            <p>Nội dung cho Giới thiệu...</p>
          </div>
    
          <div id="rules" className="content-section-sticky5">
           <Schedule/>
          </div>
    
          <div id="reviews" className="content-section-sticky6">
            {/* <h2>Đánh giá</h2>
            <p>Nội dung cho Đánh giá...</p> */}
            <Rating/>
          </div>
        </div>
      );
}

export default MainPage;