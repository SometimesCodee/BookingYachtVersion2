// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useState } from 'react';
// import { Button, Carousel, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
// import { FaCheck } from 'react-icons/fa';
// import { MdOutlineBedroomParent, MdOutlinePerson } from "react-icons/md";
// import './FormRoom.scss';
// const rooms = [
//     { id: 1, name: 'Phòng Delta Suite', size: '33 m²', price: 3550000, maxGuests: 2, image: 'image1.png' },
//     { id: 2, name: 'Phòng Ocean Suite', size: '33 m²', price: 3700000, maxGuests: 2, image: 'image2.png' },
//     { id: 3, name: 'Phòng Captain Suite', size: '38 m²', price: 3950000, maxGuests: 2, image: 'image3.png' },
//     { id: 4, name: 'Phòng Regal Suite', size: '46 m²', price: 4200000, maxGuests: 2, image: 'image4.png' }
// ];

// const RoomSelection = () => {
//     const [quantities, setQuantities] = useState(rooms.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
//     const [showModal, setShowModal] = useState(false);
//     const [selectedRoom, setSelectedRoom] = useState([]);
//     const [showDetailRom, setshowDetailRom] = useState(false);
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const newSelectedRooms = rooms.filter(room => quantities[room.id] > 0);
//         setSelectedRoom(newSelectedRooms);

//         const newTotalPrice = newSelectedRooms.reduce((acc, room) => acc + (room.price * quantities[room.id]), 0);
//         setTotalPrice(newTotalPrice);
//     }, [quantities]);



//     const handleQuantityChange = (id, delta) => {
//         setQuantities(prevQuantities => ({
//             ...prevQuantities,
//             [id]: Math.max(0, prevQuantities[id] + delta)
//         }));
//     };

//     const handleReset = () => {
//         setQuantities(rooms.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
//     };

//     const handleBookNow = (room) => {
//         setSelectedRoom(room);
//         setShowModal(true);
//     };

//     const hanleDetailRom = () => {
//         setshowDetailRom(true);
//     }

//     return (
//         <Container>
//             <h1>Các loại phòng & giá</h1>
//             <div className='form-select'>
//                 <div>
//                     <Button variant="outline-danger" onClick={handleReset}>Xóa lựa chọn</Button>
//                     {rooms.map(room => (
//                         <div key={room.id} className="my-3 p-3 border">
//                             <div className="row">
//                                 <div className="col-md-2 col-12">
//                                     <img src={room.image} alt={room.name} className="img-fluid rounded" />
//                                 </div>
//                                 <div className="col-md-6 col-12">
//                                     <h5 onClick={() => hanleDetailRom()} className='name-rom'><a href='#'>{room.name}</a></h5>
//                                     <p><MdOutlineBedroomParent /> {room.size} - Tối đa:  {room.maxGuests} <MdOutlinePerson /></p>
//                                 </div>
//                                 <div className="col-md-2 col-6 text-end">
//                                     <h5>{room.price.toLocaleString()} đ</h5>
//                                 </div>
//                                 <div className="col-md-2 col-6 d-flex align-items-center justify-content-end">
//                                     <Button variant="outline-secondary" onClick={() => handleQuantityChange(room.id, -1)}>-</Button>
//                                     <span className="mx-2">{quantities[room.id]}</span>
//                                     <Button variant="outline-secondary" onClick={() => handleQuantityChange(room.id, 1)}>+</Button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div className='my-3'>
//                         <div className="row">
//                             <div className="col-md-6 col-12">
//                                 <h5>Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
//                             </div>
//                             <div className="col-md-6 col-12 text-end">
//                                 <Button variant="secondary" onClick={() => handleBookNow()}>Thuê trọn tàu</Button>
//                                 <Button variant="primary" onClick={() => handleBookNow(selectedRoom)} className='ms-2'>Đặt ngay</Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <div className='detail_room'>
//                 <Modal show={showDetailRom} onHide={() => setshowDetailRom(false)} size="lg" centered>
//                     <Modal.Body>
//                         <Row>
//                             <Col md={6}>
//                                 <Carousel>
//                                     <Carousel.Item>
//                                         <img
//                                             className="d-block w-100"
//                                             src="https://example.com/your-image1.jpg"
//                                             alt="First slide"
//                                         />
//                                     </Carousel.Item>
//                                     <Carousel.Item>
//                                         <img
//                                             className="d-block w-100"
//                                             src="https://example.com/your-image2.jpg"
//                                             alt="Second slide"
//                                         />
//                                     </Carousel.Item>
//                                     {/* Add more Carousel.Item as needed */}
//                                 </Carousel>
//                                 <div className="mt-2 d-flex justify-content-center">
//                                     {/* Thumbnail Images */}
//                                     <img src="https://example.com/your-image1-thumb.jpg" alt="Thumbnail" className="img-thumbnail mx-1" />
//                                     <img src="https://example.com/your-image2-thumb.jpg" alt="Thumbnail" className="img-thumbnail mx-1" />
//                                     {/* Add more thumbnails as needed */}
//                                 </div>
//                             </Col>
//                             <Col md={6}>
//                                 <h5>Phòng Delta Suite</h5>
//                                 <p>33 m² - Tối đa: 2 người</p>
//                                 <ListGroup variant="flush">
//                                     <ListGroup.Item><FaCheck />Nhìn ra biển</ListGroup.Item>
//                                     <ListGroup.Item><FaCheck />Điều hòa</ListGroup.Item>
//                                     <ListGroup.Item><FaCheck />Sạc điện thoại</ListGroup.Item>
//                                     <ListGroup.Item><FaCheck />Ban công riêng</ListGroup.Item>
//                                     <ListGroup.Item><FaCheck />Wi-Fi</ListGroup.Item>
//                                     <ListGroup.Item><FaCheck />Két an toàn</ListGroup.Item>
//                                 </ListGroup>
//                             </Col>
//                         </Row>
//                     </Modal.Body>
//                 </Modal>
//             </div>



//             <div className='book_now'>
//                 <Modal show={showModal} onHide={() => setShowModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Đặt Phòng</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {selectedRoom.map(room => (
//                             <Row key={room.id} className="my-3 p-3 border">
//                                 <Col md={2}>
//                                     <img src={room.image} alt={room.name} className="img-fluid rounded" />
//                                 </Col>
//                                 <Col md={6}>
//                                     <h5>{room.name}</h5>
//                                     <p>{room.size} - Tối đa: {room.maxGuests}</p>
//                                 </Col>
//                                 <Col md={2} className="text-end">
//                                     <h5>{room.price.toLocaleString()} đ</h5>
//                                 </Col>
//                                 <Col md={2} className="d-flex align-items-center justify-content-end">
//                                     <span className="mx-2">x {quantities[room.id]}</span>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Form>
//                             <Form.Group controlId="formCheckInDate" className="mb-3">
//                                 <Form.Label>Ngày nhận phòng</Form.Label>
//                                 <Form.Control type="date" />
//                             </Form.Group>
//                             <Form.Group controlId="formName" className="mb-3">
//                                 <Form.Label>Họ và tên</Form.Label>
//                                 <Form.Control type="text" placeholder="Nhập họ và tên" />
//                             </Form.Group>
//                             <Form.Group controlId="formPhone" className="mb-3">
//                                 <Form.Label>Số điện thoại</Form.Label>
//                                 <Form.Control type="text" placeholder="Nhập số điện thoại" />
//                             </Form.Group>
//                             <Form.Group controlId="formEmail" className="mb-3">
//                                 <Form.Label>Địa chỉ email</Form.Label>
//                                 <Form.Control type="email" placeholder="Nhập email" />
//                             </Form.Group>
//                             <Form.Group controlId="formRequests" className="mb-3">
//                                 <Form.Label>Yêu cầu của bạn</Form.Label>
//                                 <Form.Control as="textarea" rows={3} placeholder="Nhập yêu cầu của bạn" />
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <h5 className="me-auto">Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
//                         <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
//                         <Button variant="primary" onClick={() => setShowModal(false)}>Đặt ngay</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>

//         </Container>
//     );
// };

// export default RoomSelection;
