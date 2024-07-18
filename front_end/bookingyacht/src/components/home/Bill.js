import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Collapse, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { GiNotebook } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addFeedback, existsFeedback, viewBillByIdCustomer } from '../../services/ApiServices';
const Bill = ({ idCustomer }) => {
  const [bills, setBills] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentBillId, setCurrentBillId] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState('');
  const [reviewedBills, setReviewedBills] = useState({});
  const [idYacht, setIdYacht] = useState(0);
  const navigate = useNavigate();

  const toggleDetails = (idBooking) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [idBooking]: !prevState[idBooking],
    }));
  };

  const handleStarClick = (star) => {
    setStarRating(star);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const today = new Date().toISOString().split('T')[0];
    formData.append('date', today);
    formData.append('description', description);
    formData.append('starRating', starRating);
    try {
      const response = await addFeedback(currentBillId, idCustomer, formData);
      if (response.data.data === false) {
        toast.error('Qúy khách đã feeback cho hóa đơn này!.');
        setShowModal(false);
        setStarRating(0);
        setDescription('');
      } else {
        setReviewedBills((prev) => ({
          ...prev,
          [currentBillId]: { starRating, description },
        }));
        setShowModal(false);
        setStarRating(0);
        setDescription('');
        toast.success('Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!');
      }
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await viewBillByIdCustomer(idCustomer);
        const sortedBills = response.data.data.sort((a, b) => {
          return new Date(b.bookingOrderDTO.bookingTime) - new Date(a.bookingOrderDTO.bookingTime);
        });
        setBills(sortedBills);

        // Check feedback status for each bill
        const feedbackStatus = sortedBills.map(async (bill) => {
          const feedbackResponse = await existsFeedback(bill.bookingOrderDTO.idBooking);
          return {
            idBooking: bill.bookingOrderDTO.idBooking,
            hasFeedback: feedbackResponse.data.data,
          };
        });

        const feedbackStatuses = await Promise.all(feedbackStatus);
        const feedbackStatusesMap = feedbackStatuses.reduce((acc, { idBooking, hasFeedback }) => {
          acc[idBooking] = hasFeedback;
          return acc;
        }, {});

        setReviewedBills(feedbackStatusesMap);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBills();
  }, [idCustomer]);

  const handleViewFeeback = (yachtId) => {
    navigate(`/mainpage/${yachtId}`)
  }

  return (
    <Container className="my-4">
      <Row>
        {bills.map((bill, index) => (
          <Col key={index} sm={12} md={6} className="mb-4">
            <Card>
              <Card.Header className="text-center">
                <h2><GiNotebook color='#42F5E9' /> Hóa Đơn</h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Text>
                      <strong>Thời gian đặt:</strong> {new Date(bill.bookingOrderDTO.bookingTime).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Số tiền:</strong> {bill.bookingOrderDTO.amount.toLocaleString()} VND
                    </Card.Text>
                    <Card.Text>
                      <strong>Trạng thái:</strong> {bill.bookingOrderDTO.status}
                    </Card.Text>
                    <Card.Text>
                      <strong>Khách hàng:</strong> {bill.bookingOrderDTO.customerDTO.fullName}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Địa chỉ:</strong> {bill.bookingOrderDTO.customerDTO.address}
                    </Card.Text>
                    <Card.Text>
                      <strong>Số điện thoại:</strong> {bill.bookingOrderDTO.customerDTO.phone}
                    </Card.Text>
                    <Card.Text>
                      <strong>Email:</strong> {bill.bookingOrderDTO.customerDTO.email}
                    </Card.Text>
                    {reviewedBills[bill.bookingOrderDTO.idBooking] ? (
                      <Button
                        variant="warning"
                        className="mt-3"
                        onClick={() => handleViewFeeback(bill.bookingOrderDTO.rooms[0].yachtId)}
                      >
                        Xem đánh giá
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        className="mt-3"
                        onClick={() => {
                          setCurrentBillId(bill.bookingOrderDTO.idBooking);
                          setShowModal(true);
                        }}
                      >
                        Đánh giá sản phẩm
                      </Button>
                    )}
                  </Col>
                </Row>
                <Button variant="link" onClick={() => toggleDetails(bill.bookingOrderDTO.idBooking)} style={{ color: '#42F5E9' }}>
                  {showDetails[bill.bookingOrderDTO.idBooking] ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                </Button>
                <Collapse in={showDetails[bill.bookingOrderDTO.idBooking]}>
                  <div>
                    <hr />
                    <h5>Thông tin lịch trình</h5>
                    <Card.Text>
                      <strong>Ngày đi</strong> {new Date(bill.bookingOrderDTO.schedule.startDate).toLocaleString()}
                      <br/>
                      <strong>Ngày về:</strong>{new Date(bill.bookingOrderDTO.schedule.endDate).toLocaleString()}
                    </Card.Text>
                    <hr />
                    <h5>Thông tin phòng</h5>
                    {bill.bookingOrderDTO.rooms.map((room, roomIndex) => (
                      <ListGroup variant="flush" key={roomIndex} className="mb-2">
                        <ListGroup.Item><strong>Phòng {roomIndex + 1}:</strong></ListGroup.Item>
                        <ListGroup.Item><strong>Diện tích:</strong> {room.area} m²</ListGroup.Item>
                        <ListGroup.Item><strong>Mô tả:</strong> {room.description}</ListGroup.Item>
                        <ListGroup.Item><strong>Tên phòng:</strong> {room.name}</ListGroup.Item>
                        <ListGroup.Item><strong>Giá:</strong> {room.price.toLocaleString()} VND</ListGroup.Item>
                      </ListGroup>
                    ))}
                    <hr />
                    <h5>Dịch vụ</h5>
                    {bill.bookingOrderDTO.services.map((service, serviceIndex) => (
                      <ListGroup variant="flush" key={serviceIndex} className="mb-2">
                        <ListGroup.Item><strong>Dịch vụ:</strong> {service.service}</ListGroup.Item>
                        <ListGroup.Item><strong>Giá:</strong> {service.price.toLocaleString()} VND</ListGroup.Item>
                      </ListGroup>
                    ))}
                    <hr />
                    <h5>Thông tin du thuyền</h5>
                    <Card.Text>
                      <strong>Tên du thuyền:</strong> {bill.bookingOrderDTO.yachtName}
                    </Card.Text>
                    <hr />
                    <h5>Thông tin giao dịch</h5>
                    <Card.Text>
                      <strong>Số tiền:</strong> {bill.transactionDTO.amount.toLocaleString()} VND
                    </Card.Text>
                    <Card.Text>
                      <strong>Ngày giao dịch:</strong> {new Date(bill.transactionDTO.transactionDate).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Trạng thái:</strong> {bill.transactionDTO.status}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mã giao dịch nhận:</strong> {bill.transactionDTO.receiverBankTranNo}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mã giao dịch gửi:</strong> {bill.transactionDTO.senderBankTranNo}
                    </Card.Text>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="rating">
              <Form.Label>Chất lượng</Form.Label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ color: starRating >= star ? 'orange' : 'gray', cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="review">
              <Form.Label>Đánh giá của bạn</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Gửi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Bill;
