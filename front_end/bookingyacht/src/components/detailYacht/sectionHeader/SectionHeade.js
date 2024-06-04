import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { GiBathtub, GiBeerBottle } from "react-icons/gi";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuShip } from "react-icons/lu";
import { MdFoodBank, MdOutlineAnchor, MdOutlineBedroomParent, MdOutlinePersonPin } from "react-icons/md";
import { PiMapPinAreaLight, PiShoppingBagOpen, PiSwimmingPool } from "react-icons/pi";
import './Section.scss';
const SectionHeader = () => {
    return (
        <div className="section-header">
            <div className="info_yacht1">
                <div>
                    <h4>Đặc điểm nổi bật</h4>
                </div>
                <div className="overview">
                    <div className="flex gap-8 align-center">
                        <label><PiSwimmingPool /> Có bể sục</label>
                    </div>
                    <div className="flex gap-8 align-center">
                        <label><GiBeerBottle /> Quầy bar</label>
                    </div>
                    <div className="flex gap-8 align-center">
                        <label><MdOutlinePersonPin /> Lễ tân 24 giờ</label>
                    </div>
                    <div className="flex gap-8 align-center">
                        <label><IoRestaurantOutline /> Bao gồm tất cả các bữa ăn</label>
                    </div>
                    <div className="flex gap-8 align-center">
                        <label><MdFoodBank /> Nhà hàng</label>
                    </div>
                    <div className="flex gap-8 align-center">
                        <label><GiBathtub /> Phòng có bồn tắm</label>
                    </div>
                </div>
                <div className='flex flex-col gap-24'>
                    <div className='flex align-center gap-8'>
                        <label><FaCheck /> Du thuyền được thiết kế với phong cách sang trọng và truyền thống</label>
                    </div>
                    <div className='flex align-center gap-8'>
                        <label><FaCheck /> Phòng ngủ tiện nghi sang trọng mang phong cách Á Đông đều có bồn tắm cạnh cửa kính lớn view vịnh</label>
                    </div>
                    <div className='flex align-center gap-8'>
                        <label><FaCheck /> Đặc biệt hơn, du thuyền thiết kế bể bơi 4 mùa to rộng là địa điểm checkin yêu thích của mọi du khách</label>
                    </div>
                    <div className='flex align-center gap-8'>
                        <label><FaCheck /> Du thuyền có nhiều lịch trình 2 ngày 1 đêm, 3 ngày 2 đêm và 4 ngày 3 đêm cho những ai muốn 1 lịch trình dài hơn trên vịnh Lan Hạg</label>
                    </div>
                </div>
            </div>
            <div className="shipcart">
                <div className='cart_cart'>
                    <div className='ShipDetail'>Thông tin du thuyền</div>
                    <div className='shipDetail flex flex-col gap-16'>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><MdOutlineAnchor/> Hạ Thủy</p>
                            </div>
                            <label>2019</label>
                        </div>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><MdOutlineBedroomParent/> Cabin</p>
                            </div>
                            <label>20</label>
                        </div>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><LuShip/> Thân vỏ</p>
                            </div>
                            <label>Kim loại</label>
                        </div>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><PiMapPinAreaLight/> Hành trình</p>
                            </div>
                            <label>Vịnh Lan Hạ - Bãi tắm Ba <br/>
                            Trái Đào - Hang Sáng Tối</label>
                        </div>
                        <div className='flex gap-24 align-start md'>
                            <div className='flex align-center gap-8'>
                                <p><PiShoppingBagOpen/> Điều hành</p>
                            </div>
                            <label>Công ty cổ phần Heritage <br/>
                            Cruises</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};



export default SectionHeader;