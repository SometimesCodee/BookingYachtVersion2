import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import i_content from '../../assets/image_1.webp';
import './Blog.scss';
import blogData from './DataBlog';
import { useTranslation } from 'react-i18next';

const HeaderComponent = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    setBlog(blogData);
  }, [blogData]);

  const { t } = useTranslation();

  const renderTitle = () => {
    return (
      <div className='title'>
        <h4>
          {t('blog.message1')}<br />
          {t('blog.message2')}
        </h4>
      </div>
    );
  }

  const renderSubtitle = () => {
    return (
      <div>
        <label className='lg'>
          {t('blog.messag3')}
          <br />
          {t('blog.message4')}
        </label>
        <br />
        <img src={i_content} className='lg' alt="Blog content" />
      </div>
    );
  }

  const renderBlog = (blog) => {
    return (
      <Col md={3} className='cart' key={blog.id}>
        <Card style={{ width: '23rem' }} className='cart-1'>
          <div className='img-cart'>
            <div className='img-cart-1'>
              <Card.Img className='ima img-fluid w-100' variant="top" src={`${blog.image}`} alt={blog.title} />
            </div>
          </div>
          <div className='body-cart'>
            <Card.Body>
              <Card.Title className='title-blog'>{blog.title}</Card.Title>
              <Card.Text className='text-card'>
                {blog.description}
              </Card.Text>
              <div className='d-flex justify-content-between align-items-center'>
                <Card.Text className='mb-0'>{blog.date}</Card.Text>
                <a href={blog.url} target='_blank' className='btn' style={{ backgroundColor: '#5AB9B4' }}>Xem chi tiết</a>
              </div>
            </Card.Body>
          </div>
        </Card>
      </Col>
    );
  };


  return (
    <div className='headerBlog'>
      {renderTitle()}
      {renderSubtitle()}
      <div className='blogCart'>
        {blog.map(renderBlog)}
      </div>
    </div>
  );
}

export default HeaderComponent;
