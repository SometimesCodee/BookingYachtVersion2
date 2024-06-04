import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './Homeage.scss';
const AdminStats = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=1');
        setCustomerCount(response.data.total);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setCompanyCount(response.data.total);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCustomers();
    fetchCompanies();
  }, []);

  return (
    <Container className="my-4 backgroundpage">
    <h1>OverView</h1>
      <Row>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Quantity Customers</Card.Title>
              <Card.Text>
                <h3>{customerCount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Quantity Companies</Card.Title>
              <Card.Text>
                <h3>{companyCount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminStats;
