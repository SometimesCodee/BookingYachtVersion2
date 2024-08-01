import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearSelectionWhenExit } from '../../../redux/action/OrderAction';
import { getScheduleByYachtApi } from '../../../redux/action/ScheduleAction';
import { getYachtByYachtIdApi } from '../../../redux/action/YachtAction';
import RoomSelection from '../priceRoom/RoomSelection';
import Rating from '../rating/Rating';
import Map from '../scheduleDetail/Map';
import SectionHeader from '../sectionHeader/SectionHeade';
import SimpleSlider from '../sliderPage/SliderImg';
import './MainPage.scss';
import { useTranslation } from 'react-i18next';



const MainPage = () => {
  const { yachtId } = useParams();
  const { yacht } = useSelector(state => state.YachtReducer);
  const { schedules } = useSelector(state => state.ScheduleReducer)
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');



  useEffect(() => {
    if (yachtId) {
      dispatch(getYachtByYachtIdApi(yachtId))
    }
  }, [dispatch, yachtId])


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

  useEffect(() => {
    if (yacht && yacht.idYacht) {
      dispatch(getScheduleByYachtApi(yacht.idYacht))
    }

  }, [yacht, dispatch])

  const renderSchedule = () => {
    const filteredSchedule = filterSchedule(schedules);
    if (!filteredSchedule || filteredSchedule.length === 0) {
      return <option value="">Không có lịch trình nào</option>;
    }
    return filteredSchedule.map((schedule) => (
      <option key={schedule.idSchedule} value={schedule.idSchedule}>
        {formatDate(schedule.startDate)} - {formatDate(schedule.endDate)}
      </option>
    ));
  }
  const filterSchedule = (schedules) => {
    const today = new Date();
    return schedules.filter(schedule => new Date(schedule.startDate) >= today);
  }

  const hanleScheduleChange = (event) => {
    dispatch(clearSelectionWhenExit())
    setSelectedSchedule(event.target.value);
  }

  useEffect(() => {
    // Set default selected schedule as the first schedule in the list
    if (schedules && schedules.length > 0) {
      const filteredSchedules = filterSchedule(schedules);
      if (filteredSchedules && filteredSchedules.length > 0) {
        setSelectedSchedule(filteredSchedules[0].idSchedule);
      } else {
        setSelectedSchedule('');
      }
    }
  }, [schedules]);


  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Months are 0-indexed
    const year = dateTime.getFullYear();

    // Pad single digit minutes with leading zero
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${day}/${month}/${year}`;
  };

  useEffect(() => {
    return () => {
      //componentWillUnmount()
      // Clean up the selected rooms state when component unmounts
      dispatch(clearSelectionWhenExit());
    };
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <div className="container">
      <nav className="navbar-sticky StickyNav">
        <a href="#title" className={currentSection === 'title' ? 'active' : ''}>{t('mainpage.message1')}</a>
        <a href="#features" className={currentSection === 'features' ? 'active' : ''}>{t('mainpage.message2')}</a>
        <a href="#rooms" className={currentSection === 'rooms' ? 'active' : ''}>{t('mainpage.message3')}</a>
        <a href="#about" className={currentSection === 'about' ? 'active' : ''}>{t('mainpage.message4')}</a>
        <a href="#rules" className={currentSection === 'rules' ? 'active' : ''}>{t('mainpage.message5')}</a>
        <a href="#reviews" className={currentSection === 'reviews' ? 'active' : ''}>{t('mainpage.message6')}</a>
      </nav>

      <div id="title" className="content-section-sticky1">
        <SimpleSlider yacht={yacht} />
      </div>
      <div id="features" className="content-section-sticky2" style={{ marginBottom: '100px' }}>
        <SectionHeader yacht={yacht} />
      </div>

      <Col md={8}>
        <h2 className='mb-4' style={{ fontWeight: 'bold' }}>{t('mainpage.message7')}</h2>

        <div id="schedule" className="content-section-sticky3 mb-3 ml-2 container" style={{ display: 'flex', alignItems: 'center' }}>
          <h5 style={{ marginRight: '10px' }}>{t('mainpage.message8')}</h5>
          <select onChange={hanleScheduleChange} value={selectedSchedule} className="form-select border border-info selectpicker btn-info" aria-label="Default select example" style={{ width: '300px' }}>
            <option value={""} style={{ color: '#0E4F4F', fontWeight: 'bold' }}>{t('mainpage.message9')}</option>
            {renderSchedule()}
          </select>
        </div>

        <div id="rooms" className="content-section">
          <RoomSelection yacht={yacht} selectedSchedule={selectedSchedule} />
        </div>

        <div id="rules" className="content-section-sticky5 mt-5">
          <Map />
        </div>

        <div id="reviews" className="content-section-sticky6 mt-5 mb-5">
          <Rating yachtId={yachtId} />
        </div>
      </Col>

    </div>
  );
}

export default MainPage;