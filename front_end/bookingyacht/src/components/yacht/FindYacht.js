import FormSearch from "../home/FormSearch";
import './FindYacht.scss';
import i_content from '../../assets/image_1.webp';
import Form from 'react-bootstrap/Form';
import YachtList from "./YachtList";
import { useState, useEffect } from "react";
import { getYachtService, getAllYachtServiceId } from "../../services/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceApi } from "../../redux/action/YachtServiceAction";
import { getAllYachtTypeApi } from './../../redux/action/YachtTypeAction';
import { FILTER_YACHT } from "../../redux/type/Type";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FindYacht = () => {
    const { services } = useSelector(state => state.YachtServiceReducer)
    const { yachtTypes } = useSelector(state => state.YachtTypeReducer)
    const dispatch = useDispatch();

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [yachtServiceIds, setYachtServiceIds] = useState([]);

    useEffect(() => {
        const fetchYachtServiceIds = async () => {
            const res = await getAllYachtServiceId();
            setYachtServiceIds(res.data.data);
        };
        fetchYachtServiceIds();
    }, [])

    useEffect(() => {
        dispatch(getAllServiceApi())
        dispatch(getAllYachtTypeApi())
    }, [dispatch])

    //The useEffect will run once when the component mounts because:
    // The dispatch function does not change between renders.
    // The empty dependency array [dispatch] behaves similarly to [], meaning the effect runs once after the initial render.
    const handleTypeChange = (event) => {
        const { value, checked } = event.target;
        setSelectedTypes(prevSelectedTypes =>
            checked ? [...prevSelectedTypes, value] : prevSelectedTypes.filter(type => type !== value)
        )
    }
    const handleServiceChange = (event) => {
        const { value, checked } = event.target;
        setSelectedServices(prevSelectedServices =>
            checked ? [...prevSelectedServices, value] : prevSelectedServices.filter(service => service !== value)
        )
    }
    useEffect(() => {
        dispatch({
            type: FILTER_YACHT,
            //payload chi nhan object
            payload: { selectedTypes, selectedServices, yachtServiceIds }
        })
    }, [selectedTypes, selectedServices, yachtServiceIds, dispatch])

    const renderYachtType = () => {
        return yachtTypes.map((yachtType) => {
            return (
                <Form.Check
                    type="checkbox"
                    id={yachtType.idYachtType}
                    name="yachtType"
                    value={yachtType.starRanking}
                    key={yachtType.idYachtType}
                    label={`${yachtType.starRanking} sao`}
                    onChange={handleTypeChange}
                    checked={selectedTypes.includes(yachtType.starRanking.toString())}
                />
            )
        })
    }
    const renderService = () => {
        return services.map((service) => {
            return (
                <Form.Check
                    type="checkbox"
                    id={service.idService}
                    name="service"
                    value={service.idService.toString()}
                    key={service.idService}
                    label={service.service}
                    onChange={handleServiceChange}
                    checked={selectedServices.includes(service.idService.toString())}
                />
            )
        })
    }
    const handleResetFilters = () => {
        setSelectedServices([]);
        setSelectedTypes([]);
    };

    const { t } = useTranslation();

    return (
        <div className="find-yacht-body">
            <div className="find-yacht-content container">
                <div className="search-yacht">
                    <FormSearch />
                </div>
                <div className='feedback-header my-5 row'>
                    <div className='yacht-title col-md mx-4'>
                        <h2 style={{ fontWeight: 'bold' }}>{t('findyacht.message1')}</h2>
                        <div>
                            <img src={i_content} alt="" />
                        </div>
                    </div>
                </div>
                <div className="result-search row">
                    <div className="col-3 filter-body">
                        <div className="filter-body-header d-flex">
                            <div className="filter-body-content">
                                {t('findyacht.filter')}
                            </div>
                            <div>
                                <button onClick={() => { handleResetFilters() }}>
                                    {t('findyacht.reset')}
                                </button>
                            </div>
                        </div>

                        <hr />

                        <div className="filter-star d-flex">
                            <div className="star-body-content">
                                {t('findyacht.star')}
                            </div>
                            {renderYachtType()}
                        </div>
                        <div className="filter-extention d-flex">
                            <div className="extention-body-content">
                                {t('findyacht.service')}
                            </div>
                            {renderService()}
                        </div>
                    </div>

                    <div className="col-1"></div>

                    <div className="col-8 infor">
                        <YachtList />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default FindYacht;