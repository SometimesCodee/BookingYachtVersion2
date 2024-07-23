import i_content from '../../assets/image_1.webp';
import './Home.scss';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import HaLong1 from '../../assets/Ha-Long.webp';
import HaLong2 from '../../assets/vinh-lan-ha.jpg';
import HaLong3 from '../../assets/Intro-Cat-Ba.webp';
import { useEffect, useState } from 'react';
import { getAllLocationCustomer } from '../../services/ApiServices';
import { useDispatch } from 'react-redux';
import { SEARCH_YACHT, SET_SELECTED_LOCATION } from '../../redux/type/Type';

const ShowIsland = () => {
    const [locations, setLocation] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllLocation = async () => {
            const res = await getAllLocationCustomer();
            if (res && res.data && res.data.data) {
                setLocation(res.data.data);
            }
        }
        getAllLocation();
        dispatch({
            type: SET_SELECTED_LOCATION,
            payload: 'all'
        });
    }, [dispatch])

    const onClickLocation = (location) => {
        dispatch({
            type: SET_SELECTED_LOCATION,
            payload: location.name
        });
    };

    const renderLocation = () => {
        return locations.map((location, index) => {
            return (
                <NavLink to={`/duthuyen`} onClick={() => onClickLocation(location)} className='nav-link col-12 col-sm-6 col-md-3 mb-4' key={location.idLocation}>
                    <Card style={{ height: '330px', width: '320px' }}>
                        <Card.Img variant="top" src={index === 0 ? HaLong1 : index === 1 ? HaLong2 : HaLong3} style={{ height: 220 }} className='object-fit-cover' />
                        <Card.Body>
                            <Card.Title>{location.name}</Card.Title>
                            <button className='btn btn-outline-dark'>Xem</button>
                        </Card.Body>
                    </Card>
                </NavLink>
            )
        })
    }
    return (
        <>
            <div className='island-header text-center my-5'>
                <div className='yacht-title'>
                    <h2 style={{ fontWeight: 'bold' }}>Các điểm đến của Yacht Cruise</h2>
                </div>
                <p>
                    Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên
                </p>
                <div>
                    <img src={i_content} />
                </div>
            </div>
            <div className='island-body row'>
                {renderLocation()}
            </div>
        </>
    )
}

export default ShowIsland;