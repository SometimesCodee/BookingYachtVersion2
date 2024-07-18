import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalGetDetailBooking = (props) => {
    const { show, onHide, bookingOrderDetail } = props;

    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Chi tiết đơn đặt chỗ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bookingOrderDetail ? (
                    <div>
                        <p><strong>Mã đặt chỗ:</strong> {bookingOrderDetail.idBooking}</p>
                        <p><strong>Thời gian đặt chỗ:</strong> {formatDateTime(bookingOrderDetail.bookingTime)}</p>
                        <p><strong>Tổng tiền:</strong> {formatAmount(bookingOrderDetail.amount)} VND</p>
                        <p><strong>Yêu cầu:</strong> {bookingOrderDetail.requirement}</p>
                        <p><strong>Trạng thái:</strong> {bookingOrderDetail.status}</p>
                        <p><strong>Tên du thuyền:</strong> {bookingOrderDetail.yachtName}</p>
                        <p><strong>Ngày đi:</strong> {formatDateTime(bookingOrderDetail.schedule.startDate)}</p>
                        <p><strong>Ngày về:</strong> {formatDateTime(bookingOrderDetail.schedule.endDate)}</p>
                        <p><strong>Thông tin khách hàng:</strong></p>
                        <ul>
                            <li>
                                <p><strong>Họ tên:</strong> {bookingOrderDetail.customerDTO.fullName}</p>
                                <p><strong>Email:</strong> {bookingOrderDetail.customerDTO.email}</p>
                                <p><strong>Số điện thoại:</strong> {bookingOrderDetail.customerDTO.phone}</p>
                                <p><strong>Địa chỉ:</strong> {bookingOrderDetail.customerDTO.address}</p>
                            </li>
                        </ul>
                        <p><strong>Phòng:</strong></p>
                        <ul>
                            {bookingOrderDetail.rooms.map(room => (
                                <li key={room.idRoom}>
                                    <p><strong>Phòng:</strong> {room.name}</p>
                                    <p><strong>Giá:</strong> {formatAmount(room.price)} VND</p>
                                    <p><strong>Diện tích:</strong> {room.area}</p>
                                </li>
                            ))}
                        </ul>
                        <p><strong>Dịch vụ:</strong></p>
                        <ul>
                            {bookingOrderDetail.services.map(service => (
                                <li key={service.idService}>
                                    <p><strong>Dịch vụ:</strong> {service.service}</p>
                                    <p><strong>Giá:</strong> {formatAmount(service.price)} VND</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalGetDetailBooking;