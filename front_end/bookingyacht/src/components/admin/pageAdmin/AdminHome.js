// AdminStats.js
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaUsersRectangle } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, fetchCustomers } from '../../../redux/action/AdminAction';
import './Homepage.scss';

const AdminStats = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.admin.customers);
    const companies = useSelector(state => state.admin.companies);

    useEffect(() => {
        dispatch(fetchCompanies());
        dispatch(fetchCustomers());
    }, [dispatch]);

    return (
        <Container className="my-4 backgroundpage">
            <h1>OverView</h1>
            <Row>
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title><ImUsers /> Người Dùng</Card.Title>
                            <Card.Text>
                                <h3>{customers.length}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title><FaUsersRectangle /> Công Ty</Card.Title>
                            <Card.Text>
                                <h3>{companies.length}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminStats;
