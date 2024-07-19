import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Button, Col, FormControl, FormGroup, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SEARCH_YACHT } from '../../redux/type/Type';
import { login } from './../../services/ApiServices';
import { YachtListReducer } from './../../redux/reducer/YachtListReducer';
import { useSearchTrigger } from './TriggerFormSearch';

const FormSearch = () => {
    const dispatch = useDispatch();
    const { selectedLocation } = useSelector(state => state.YachtListReducer);
    const { trigger } = useSearchTrigger();
    console.log("selectedLocation:", selectedLocation)

    const [searchData, setSearchData] = useState({
        name: '',
        location: selectedLocation || 'all',
        // price: 'all',
    });

    console.log(searchData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData({
            ...searchData,
            [name]: value
        })
    };

    useEffect(() => {
        dispatch({
            type: SEARCH_YACHT,
            payload: searchData
        });
    }, [searchData, dispatch]);

    useEffect(() => {
        // This effect will run once when trigger changes
        dispatch({
            type: SEARCH_YACHT,
            payload: searchData
        });
    }, [trigger, dispatch, searchData]);

    const hanldeSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: SEARCH_YACHT,
            payload: searchData
        });
    }

    return (
        <div>
            <div className='homepage-content container '>
                <form className='mb-3 serach-yacht p-4' onSubmit={hanldeSubmit}>
                    <div className='text-center'>
                        <h3 style={{ fontWeight: 'bold' }}>Bạn lựa chọn du thuyền Hạ Long nào ?</h3>
                        <p>Có rất nhiều du thuyền dành cho bạn</p>
                    </div>
                    <div className='form-search'>
                        <Row>
                            <Col md={7}>
                                <FormGroup>
                                    <FormControl

                                        placeholder='Nhập từ khóa'
                                        type='text'
                                        name='name'
                                        onChange={handleChange}
                                        style={{ paddingLeft: '40px' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <select className='select' name='location' onChange={handleChange} style={{ color: '#595C5F', paddingLeft: '20px', paddingRight: '10px' }} value={searchData.location}>
                                    <option value='all'>Tất cả các địa điểm</option>
                                    <option value='Hạ Long'>Vịnh Hạ Long</option>
                                    <option value='Lan Hạ'>Vịnh Lan Hạ</option>
                                    <option value='Cát Bà'>Đảo Cát Bà</option>
                                </select>

                            </Col>
                            <Col md={2}>
                                <button style={{ paddingLeft: '30px', paddingRight: '30px' }} size='lg'>Tìm kiếm</button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </div >

        </div >
    )
};

export default FormSearch;