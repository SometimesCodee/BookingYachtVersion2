import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import i_content from '../../assets/image_1.webp';
import Enterprice from '../home/Enterprice';
import '../home/Home.scss';
import './Enterprise.scss';
import ViewInfoCompany from './ViewInfoCompany';
import { useTranslation } from 'react-i18next';

// Component Header
const Header = () => {
  const { t } = useTranslation();
  return (
    <div className="header">
      <h4>{t('businesspage.message1')}</h4>
      <img src={i_content} />
      <label>{t('businesspage.message2')}</label>
      <button className="btn btn-primary">{t('businesspage.message3')}</button>
    </div>
  )
};

// Component BusinessItem
const BusinessItem = ({ imgSrc, title, description }) => (
  <div className="business-col">
    <div className="business">
      <img src={imgSrc} className="img-fluid" alt="Business" />
      <div className="content-detail">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

// Component BusinessItems
const BusinessItems = () => {
  const { t } = useTranslation();

  return (
    <div className="content-2">
      <div className="row">
        <BusinessItem
          imgSrc="https://mixivivu.com/business/business1.png"
          title={t('businesspage.message4')}
          description={t('businesspage.message5')}
        />
        <BusinessItem
          imgSrc="https://mixivivu.com/business/business2.png"
          title={t('businesspage.message6')}
          description={t('businesspage.message7')}
        />
        <BusinessItem
          imgSrc="https://mixivivu.com/business/business3.png"
          title={t('businesspage.message8')}
          description={t('businesspage.message9')}
        />
      </div>
    </div>
  )
};

// Component HeaderPage
const HeaderPage = () => {
  const { t } = useTranslation();
  return (
    <div className="body-page">
      <div className="container">
        <div style={{ padding: '30px' }}>
          <h1 style={{ fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic' }}>{t('businesspage.message10')}
            <br />
            {t('businesspage.message11')}</h1>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="content-1">
              <Header />
            </div>
          </div>
          <div className="col-lg-6">
            <BusinessItems />
          </div>
          <div>
            <ViewInfoCompany />
          </div>
        </div>
      </div>
      <div className='app-enterprice'>
        <Enterprice />
      </div>
    </div>
  )
};

export default HeaderPage;
