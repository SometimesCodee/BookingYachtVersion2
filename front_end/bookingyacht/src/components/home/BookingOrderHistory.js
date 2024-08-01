import React, { useEffect, useState } from 'react';
import { cancelBookingByCustomer, getBookingOrderByCustomer, getDetailBookingByCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FaInfoCircle } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';
import { Input } from 'antd';
import ModalGetDetailBooking from './ModalGetDetailBooking';

const BookingOrderHistory = () => {
    const idCustomer = useSelector(state => state.account.account.idCustomer);

    const [getBooking, setBooking] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 4;

    const [cancelReason, setCancelReason] = useState('');
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [showModalDetail, setShowModalDetail] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);



    useEffect(() => {
        getBookingOrder();
    }, [idCustomer, currentPage])

    const getBookingOrder = async () => {
        let res = await getBookingOrderByCustomer(idCustomer)

        if (res && res.data.data) {
            const totalBookings = res.data.data.length;
            const totalPages = Math.ceil(totalBookings / itemsPerPage);
            const sortedBookings = res.data.data.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
            setPageCount(totalPages);
            setBooking(sortedBookings);
        } else {
            toast.error("Không tìm thấy đơn đặt chỗ nào")
            console.log("can not found Booking Order")
        }
    }

    const handleShowModalCancel = (bookingOrder) => {
        setSelectedBooking(bookingOrder);
        setShowModalCancel(true);
    }

    const handleCancelBooking = async () => {
        try {
            const response = await cancelBookingByCustomer(idCustomer, selectedBooking.idBooking, cancelReason)
            if (response.data.data === false) {
                toast.success('Cancel Booking Successfully')
                getBookingOrder()
                setShowModalCancel(false);
            }
        } catch (error) {
            toast.error('Cancel Booking Fail')
        }
    }

    const handleShowModalDetail = async (idBooking) => {
        let res = await getDetailBookingByCustomer(idCustomer, idBooking)
        // console.log('cc', res)

        if (res && res.data.data) {
            setBookingDetails(res.data.data);
            setShowModalDetail(true);
        } else {
            toast.error("Không thể tải Chi tiết đơn đặt chỗ")
            console.log("Can not load detail Booking Order")
        }
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
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

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedBooking = getBooking.slice(startIndex, endIndex);

    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div className="container">
            <h1>Lịch Sử Đặt Chỗ</h1>
            <div>
                {slicedBooking && slicedBooking.length > 0 && slicedBooking.map(bookingOrder => (
                    <div key={bookingOrder.idBooking} className="card mb-3" style={{ boxShadow: ' 0 4px 8px 0 rgba(0, 0, 255, 0.2)' }}>
                        <div className='card-body'>
                            <div className="row align-items-center">
                                <div className="col-11">
                                    <h5 className='card-title'>Mã đặt chỗ: {bookingOrder.idBooking}</h5>
                                </div>
                                <div className='col-1' onClick={() => handleShowModalDetail(bookingOrder.idBooking)}>
                                    <FaInfoCircle size={24} style={{ color: 'black', cursor: 'pointer' }} />
                                </div>
                                <div className="col-12">
                                    <p className='card-text'>
                                        <strong>Thời gian đặt chỗ:</strong> {formatDateTime(bookingOrder.bookingTime)}
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p className="card-text">
                                        <strong>Tổng tiền:</strong> {formatAmount(bookingOrder.amount)} VND
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p className="card-text">
                                        <strong>Yêu cầu:</strong> {bookingOrder.requirement}
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p className="card-text">
                                        <strong>Trạng thái:</strong>
                                        <span style={{
                                            color: bookingOrder.status === 'Pending' ? 'orange' :
                                                (bookingOrder.status === 'Confirmed' ? 'green' :
                                                    (bookingOrder.status === 'Cancelled' ? 'red' : 'black'))
                                        }}> {bookingOrder.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {bookingOrder.status === 'Pending' && (
                                <button className="btn btn-danger mt-2"
                                    onClick={() => handleShowModalCancel(bookingOrder)}
                                >
                                    Hủy đặt chỗ
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className='page'>
                <ReactPaginate
                    previousLabel="< Prev"
                    nextLabel="Next >"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    forcePage={currentPage}
                    disableInitialCallback={true}
                />
            </div>

            {/* Modal */}
            <Modal show={showModalCancel} onHide={() => setShowModalCancel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Hủy Đặt chỗ
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nếu bạn hủy đơn đặt chỗ này, bạn sẽ không được hoàn lại tiền!</p>
                    <p>Vui lòng điền lý do hủy đơn (có thể bỏ trống):</p>
                    <Input
                        type='text'
                        className='form-control'
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='danger' onClick={handleCancelBooking}>
                        Hủy đặt chỗ
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal get Detail */}
            <ModalGetDetailBooking
                show={showModalDetail}
                onHide={() => setShowModalDetail(false)}
                bookingOrderDetail={bookingDetails}
            />
        </div>
    );
};

export default BookingOrderHistory; 