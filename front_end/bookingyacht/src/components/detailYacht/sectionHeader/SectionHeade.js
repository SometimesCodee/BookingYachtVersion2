import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { FcIdea } from "react-icons/fc";
import { FaCheck } from 'react-icons/fa';
import { LuShip } from "react-icons/lu";
import { FcApproval } from "react-icons/fc";
import { MdFoodBank, MdOutlineAnchor, MdOutlineBedroomParent, MdOutlinePersonPin } from "react-icons/md";
import { PiMapPinAreaLight, PiShoppingBagOpen, PiSwimmingPool } from "react-icons/pi";
import './Section.scss';
import { getServiceByYacht } from '../../../services/ApiServices';
import { useSelector, useDispatch } from 'react-redux';
import { getServiceByYachtApi } from '../../../redux/action/ServiceByYachtAction';
import { FcBookmark } from "react-icons/fc";


const SectionHeader = ({ yacht }) => {
    const [services, setServices] = useState([]);
    const getServiceByYachtId = async (yachtId) => {
        let res = await getServiceByYacht(yachtId);
        setServices(res.data.data)
    }
    useEffect(() => {
        getServiceByYachtId(yacht.idYacht)
    }, [yacht.idYacht])

    const description = yacht.description ? yacht.description.split('.').filter(sentence => sentence.trim()) : [];
    return (
        <div className="section-header">
            <div className="info_yacht1 mr-4">
                <div>
                    <h4 className='mb-4'>Đặc điểm nổi bật</h4>
                </div>
                <div className="overview">
                    {services.map((item, index) => (
                        <div key={index} className="flex gap-8 align-center">
                            <label><FcIdea /> {item.service}</label>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-24 mt-4'>
                    {description.map((des, index) => (
                        <div key={index} className="flex align-center gap-8 mb-4">
                            <p><FcBookmark color='green' size={25} /> {des}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shipcart">
                <div className='cart_cart'>
                    <div className='ShipDetail' style={{ fontWeight: 'bold' }}>Thông tin du thuyền</div>
                    <div className='shipDetail flex flex-col gap-16'>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><MdOutlineAnchor /> Hạ Thủy</p>
                            </div>
                            <label>{yacht.launch}</label>
                        </div>
                        {/* <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><MdOutlineBedroomParent /> Cabin</p>
                            </div>
                            <label>20</label>
                        </div> */}
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><LuShip /> Thân vỏ</p>
                            </div>
                            <label>{yacht.hullBody}</label>
                        </div>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><PiMapPinAreaLight /> Hành trình</p>
                            </div>
                            <label>{yacht.itinerary}</label>
                        </div>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><PiShoppingBagOpen /> Điều hành</p>
                            </div>
                            <label>{yacht.company ? yacht.company.name : 'N/A'}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};



export default SectionHeader;