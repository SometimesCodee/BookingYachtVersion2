
import { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { RiShipLine } from "react-icons/ri";
import './FindYacht.scss';
// import { img_yacht } from '../../assets/no53ab0y526yl825.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getYachtListApi } from '../../redux/action/YachtListAction';
import { getHighestAndLowestPriceByYacht } from '../../services/ApiServices';
import { useSearchTrigger } from '../home/TriggerFormSearch';
import NotFound from '../page404/NotFound';
const YachtList = () => {
    const [pagging, setPagging] = useState([]); // page 1, 2, 3, ...
    const [paggingYacht, setPaggingYacht] = useState([]); // yachts in a page
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { yachtList } = useSelector((state) => state.YachtListReducer);
    const { triggerSearch } = useSearchTrigger();
    const [priceData, setPriceData] = useState({});
    console.log('pricedata', priceData);
    console.log(yachtList);

    useEffect(() => {
        dispatch(getYachtListApi())
    }, [dispatch]);

    useEffect(() => {
        if (yachtList.length > 0) {
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

    const avatarYachtApi = 'https://yachtbookingbackend.azurewebsites.net/api/customer/file/'

    const handelChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

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
        setCurrentPage(1);
        // triggerSearch();
    }, [yachtList, triggerSearch]);

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

    const navigate = useNavigate()

    const hanldeSelectedYacht = (idYacht) => {
        navigate(`/mainpage/${idYacht}`);
    }

    return (
        <div className="infor-body">
            {yachtList.length > 0 ? (
                <>
                    {
                        paggingYacht.map((yacht) => {
                            return (
                                <div className="card row" key={yacht.idYacht} onClick={() => { hanldeSelectedYacht(yacht.idYacht) }} style={{ cursor: 'pointer' }}>
                                    <div className="col-md-5">
                                        <img style={{ height: '250px', width: '100%' }} className="card-img-top object-fit-cover" src={`${avatarYachtApi}${yacht.image}`} alt="Card cap" />
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
                                </div>
                            )
                        })
                    }
                    <div className='d-flex justify-content-center'>
                        {renderPages()}
                    </div>
                </>
            ) : (
                <NotFound />
            )}

        </div >
    );
};

export default YachtList;