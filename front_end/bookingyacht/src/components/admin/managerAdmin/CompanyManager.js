import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import './Manager.scss';

const CompanyManager = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users?page=1');
            setCompanies(response.data.data);
            setFilteredCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSearchCompany = value => {
        setSearchTerm(value);
        const filtered = companies.filter(company =>
            company.first_name.toLowerCase().includes(value.toLowerCase()) ||
            company.last_name.toLowerCase().includes(value.toLowerCase()) ||
            company.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    const handleCreateCompany = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        // Add create company logic here
        setShowCompanyModal(false);
    };

    const handleDeleteCompany = companyId => {
        // Add delete company logic here
    };

    const handleCloseDetailModal = () => setShowDetailModal(false);
    const handleShowDetailModal = (company) => {
        setSelectedCompany(company);
        setShowDetailModal(true);
    };

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>

            <h2>Company Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search company by name or email"
                    value={searchTerm}
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
                    {filteredCompanies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.first_name} {company.last_name}</td>
                            <td>{company.email}</td>
                            <td className='button_mana'>
                                <Button variant="primary" onClick={() => handleShowDetailModal(company)}>View Detail</Button>
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
                        <Form.Group controlId="formCompanyPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Company Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCompany && (
                        <>
                            <p><strong>ID:</strong> {selectedCompany.id}</p>
                            <p><strong>Name:</strong> {selectedCompany.first_name} {selectedCompany.last_name}</p>
                            <p><strong>Email:</strong> {selectedCompany.email}</p>
                            {/* Add other company details here */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CompanyManager;
