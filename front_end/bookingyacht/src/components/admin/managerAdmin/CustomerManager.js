import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './Manager.scss';
const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users?page=2');
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSearchCustomer = value => {
        // Add search logic here
    };

    // const handleCreateCustomer = event => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     const name = form.elements.name.value;
    //     const email = form.elements.email.value;
    //     // Add create customer logic here
    //     setShowCustomerModal(false);
    // };

    const handleDeleteCustomer = customerId => {
        // Add delete customer logic here
    };

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>
            <h2>Customer Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search customer"
                    onChange={e => handleSearchCustomer(e.target.value)}
                />
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
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.first_name} {customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td className='button_mana'>
                                <Button variant="primary" onClick={() => setSelectedCustomer(customer)}>ViewDetail</Button>
                                <Button variant="dark" onClick={() => handleDeleteCustomer(customer.id)}>Hidden</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Company Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateCompany}>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter company name" name="name" required />
                        </Form.Group>
                        <Form.Group controlId="formCompanyEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter company email" name="email" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal> */}

        </div>
    );
};

export default CustomerManager;
