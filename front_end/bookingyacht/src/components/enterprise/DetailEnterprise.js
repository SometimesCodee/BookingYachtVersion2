import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdBoat, IoMdMail } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { RiShipLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { getHighestAndLowestPriceByYacht } from '../../services/ApiServices';
import '../yacht/FindYacht.scss';
import './InfoCompany.scss';
const ProfilePage = () => {
    const getImageApi = `http://localhost:8080/api/customer/file/`
    const { idCompany } = useParams();
    const navigate = useNavigate();
    const [pagging, setPagging] = useState([]);
    const [paggingYacht, setPaggingYacht] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [yachtList, setYachtList] = useState([]);
    const [company, setCompany] = useState(null);
    const [priceData, setPriceData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/customer/yacht/findByCompany/${idCompany}`)
            .then(res => {
                setPaggingYacht(res.data.data)
                setYachtList(res.data.data)
            })
            .catch(error => {
                console.log(error)
            });
        axios.get(`http://localhost:8080/api/customer/profilesCompany/${idCompany}`)
            .then(res => {
                setCompany(res.data.data)
                console.log(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [idCompany])

    useEffect(() => {
        // Fetch prices for each yacht in paggingYacht
        const fetchPrices = async () => {
            const priceData = {};
            for (const yacht of paggingYacht) {
                try {
                    const response = await getHighestAndLowestPriceByYacht(yacht.idYacht);
                    priceData[yacht.idYacht] = response.data.data;
                } catch (error) {
                    console.error('Error fetching price:', error);
                }
            }
            setPriceData(priceData);
        };

        if (paggingYacht.length > 0) {
            fetchPrices();
        }
    }, [paggingYacht]);

    useEffect(() => {
        if (yachtList.length) {
            const startIndex = (currentPage - 1) * 5;
            const endIndex = startIndex + 5;
            setPaggingYacht(yachtList.slice(startIndex, endIndex));

            const pages = [];
            const num = Math.ceil(yachtList.length / 5);
            for (let i = 1; i <= num; i++) {
                pages.push(i);
            }
            setPagging(pages);
        }
    }, [yachtList, currentPage]);

    const avatarYachtApi = 'http://localhost:8080/api/customer/file/'

    const handelChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const renderPages = () => {
        return pagging.map((page) => {
            return (
                <button key={page}
                    onClick={() => { handelChangePage(page) }}
                    className={page === currentPage ? 'btn btn-dark' : 'btn btn-light'}
                    style={{ margin: '0px 5px 20px 5px' }}
                >{page}
                </button>
            )
        })
    }

    const hanldeSelectedYacht = (idYacht) => {
        navigate(`/mainpage/${idYacht}`);
    }

    return (
        <div className='mainpage'>
            <div className='container'>
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center cover-photo-container">
                        {company && (
                            <div className="profile-info container">
                            <Image src={`${getImageApi}${company.logo}`} className="profile-photo" />
                                <div className="profile-text">
                                    <h2 style={{ fontWeight: 'bold', fontSize: '50px', color: '#0E4F4F', fontFamily: 'Roboto, sans-serif' }}><IoMdBoat />{company.name}</h2>
                                    <p style={{ fontWeight: 'bold' }}><i>Chào mừng bạn đến với du thuyền, điểm đến hàng đầu cho những trải nghiệm du thuyền
                                        sang trọng và đẳng cấp! Chúng tôi tự hào mang đến cho khách hàng những chuyến hải trình
                                        đáng nhớ, kết hợp giữa sự thoải mái, tiện nghi và phong cách thượng lưu.</i></p>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{fontWeight : 'bold'}}>Giới thiệu</Card.Title>
                                {
                                    company && (
                                        <Card.Text>
                                            <p><LuMapPin /> Địa điểm: <strong>{company.address}</strong></p>
                                            <p><IoMdMail /> Email: <strong>{company.email}</strong></p>
                                        </Card.Text>
                                    )
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <div style={{ marginLeft: '30px' }}>
                            <h3>Tất cả các thuyền</h3>
                            <div className="infor-body">
                                {
                                    paggingYacht.map((yacht) => {
                                        return (
                                            <div className="card row d-flex" key={yacht.idYacht} onClick={() => { hanldeSelectedYacht(yacht.idYacht) }} style={{ cursor: 'pointer', marginTop: '20px' }}>
                                                <Row>
                                                <div className="col-md-5">
                                                    <img style={{ height: '250px', width: '100%', borderRadius : '35px', padding : '15px 0' }} className="card-img-top object-fit-cover" src={`${avatarYachtApi}${yacht.image}`} alt="Card cap" />
                                                </div>
                                                <div className="card-body col-md-7">
                                                    <div className='card-content'>
                                                        <div style={{ padding: '10px', color: '#475467', width: '80px' }} className='location'><FaLocationDot />{yacht.location.name}</div>
                                                        <h4 className='name' style={{ marginBottom: 0, fontWeight: 'bold' }}>{yacht.name}</h4>
                                                        <p style={{ margin: '0px' }}>Hạ thủy: {yacht.launch} - Vỏ Tàu {yacht.hullBody}</p>
                                                        <div style={{ fontWeight: 'bold' }}> <RiShipLine /> {yacht.itinerary} </div>
                                                        <div className='price d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <p style={{ color: '#475467', fontWeight: '700' }}>Price: {priceData[yacht.idYacht] ? `${priceData[yacht.idYacht].lowestPrice.toLocaleString()} - ${priceData[yacht.idYacht].highestPrice.toLocaleString()}đ` : 'Loading...'}</p>
                                                            <button style={{ borderRadius: 25 }} className='btn btn-warning'>Đặt ngay</button>
                                                        </div>
                                                    </div>
                                                </div>    
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                                <div className='d-flex justify-content-center' style={{padding : '15px 0'}}>
                                    {renderPages()}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProfilePage;
