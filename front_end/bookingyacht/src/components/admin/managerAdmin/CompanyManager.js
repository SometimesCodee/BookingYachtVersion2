import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import './Manager.scss';
const CompanyManager = () => {
    const [companies, setCompanies] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showCompanyModal, setShowCompanyModal] = useState(false);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users?page=1');
            setCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSearchCompany = value => {
        // Add search logic here
    };


    const handleCreateCompany = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        // Add create company logic here
        setShowCompanyModal(false);
    };
    const handleDeleteCompany = companyId => {
        // Add delete company logic here
    };

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>

            <h2>Company Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search company"
                    onChange={e => handleSearchCompany(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowCompanyModal(true)} className="ml-2">
                    Create Company Account
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.first_name} {company.last_name}</td>
                            <td>{company.email}</td>
                            <td className='button_mana'>
                                <Button variant="primary" onClick={() => setSelectedCompany(company)}>ViewDetail</Button>
                                <Button variant="dark" onClick={() => handleDeleteCompany(company.id)}>Hidden</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Company Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateCompany}>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Username Company</Form.Label>
                            <Form.Control type="text" placeholder="Enter company name" name="name" required />
                        </Form.Group>
                        <Form.Group controlId="formCompanyEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" required />
                        </Form.Group>
                        <Form.Group controlId="formCompanyEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="Password" placeholder="Enter password" name="password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CompanyManager;
