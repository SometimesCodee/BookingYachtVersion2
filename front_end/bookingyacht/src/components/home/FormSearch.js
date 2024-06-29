import React, { useState } from 'react';
import { Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import './Home.scss';

const FormSearch = () => {
    const init = {
        nameYacht: '',
        location: '',
        price: ''
    }
    const [searchData, setSearchData] = useState(init);
    const handleChange = (e) => {
        setSearchData(
            {
                ...searchData,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleSearch = () => {
        console.log("check search", searchData)
    }

    return (
        <div>
            <div className='homepage-content container '>
                <form className='mb-3 serach-yacht p-4'>
                    <div className='text-center'>
                        <h3 style={{ fontWeight: 'bold' }}>Bạn lựa chọn du thuyền Hạ Long nào ?</h3>
                        <p>Có rất nhiều du thuyền dành cho bạn</p>
                    </div>
                    <div className='form-search'>
                        <Row>
                            <Col md={5}>
                                <FormGroup>
                                    <FormControl
                                        placeholder='Search Yacht'
                                        type='text'
                                        name='nameYacht'
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <select className='select p-2' name='location' onChange={handleChange} style={{ color: '#595C5F' }}>
                                    <option value='all'>Tất cả các địa điểm</option>
                                    <option value='Vịnh Hạ Long'>Vịnh Hạ Long</option>
                                    <option value='Vịnh Lan Hạ'>Vịnh Lan Hạ</option>
                                    <option value='Đảo Cát Bà'>Đảo Cát Bà</option>

                                </select>

                            </Col>
                            <Col>
                                <select className='select p-2' name='price' onChange={handleChange} style={{ color: '#595C5F' }}>
                                    <option value='all'>Tất cả các mức giá</option>
                                    <option value='1 Đến 3 Triệu'>1 Đến 3 Triệu</option>
                                    <option value='3 Đến 6 Triệu'>3 Đến 6 Triệu</option>
                                    <option value='Trên 6 Triệu'>Trên 6 Triệu</option>
                                </select>
                            </Col>
                            <Col>
                                <button style={{ paddingLeft: '30px', paddingRight: '30px' }} size='lg'>Search</button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </div>

        </div>
    )
};

export default FormSearch;