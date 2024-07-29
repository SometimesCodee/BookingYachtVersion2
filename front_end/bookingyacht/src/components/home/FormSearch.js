import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Button, Col, FormControl, FormGroup, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SEARCH_YACHT } from '../../redux/type/Type';
import { login } from './../../services/ApiServices';
import { YachtListReducer } from './../../redux/reducer/YachtListReducer';
import { useSearchTrigger } from './TriggerFormSearch';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

    return (
        <div>
            <div className='homepage-content container '>
                <form className='mb-3 serach-yacht p-4' onSubmit={hanldeSubmit}>
                    <div className='text-center'>
                        <h3 style={{ fontWeight: 'bold' }}>{t('fromsearch.message1')}</h3>
                        <p>{t('fromsearch.message2')}</p>
                    </div>
                    <div className='form-search'>
                        <Row>
                            <Col md={7}>
                                <FormGroup>
                                    <FormControl

                                        placeholder={t('fromsearch.input')}
                                        type='text'
                                        name='name'
                                        onChange={handleChange}
                                        style={{ paddingLeft: '40px' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <select className='select' name='location' onChange={handleChange} style={{ color: '#595C5F', paddingLeft: '20px', paddingRight: '10px' }} value={searchData.location}>
                                    <option value='all'>{t('fromsearch.location1')}</option>
                                    <option value='Hạ Long'>{t('fromsearch.location2')}</option>
                                    <option value='Lan Hạ'>{t('fromsearch.location3')}</option>
                                    <option value='Cát Bà'>{t('fromsearch.location4')}</option>
                                </select>

                            </Col>
                            <Col md={2}>
                                <button style={{ paddingLeft: '30px', paddingRight: '30px' }} size='lg'>{t('fromsearch.search')}</button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </div >

        </div >
    )
};

export default FormSearch;