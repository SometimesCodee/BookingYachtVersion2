import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import './Manager.scss';
const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users?page=2');
            setCustomers(response.data.data);
            setFilteredCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSearchCustomer = value => {
        // Add search logic here
        setSearchTerm(value);
        const filtered = customers.filter(customer =>
            customer.first_name.toLowerCase().includes(value.toLowerCase()) ||
            customer.last_name.toLowerCase().includes(value.toLowerCase()) ||
            customer.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCustomers(filtered);
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

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>
            <h2>Customer Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search customer by name or email"
                    value={searchTerm}
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
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.first_name} {customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td className='button_mana'>
                                <Button variant="primary" onClick={() => handleShowModal(customer)}>View Detail</Button>
                                <Button variant="dark" onClick={() => handleDeleteCustomer(customer.id)}>Hidden</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCustomer && (
                        <>
                            <p><strong>ID:</strong> {selectedCustomer.id}</p>
                            <p><strong>Name:</strong> {selectedCustomer.first_name} {selectedCustomer.last_name}</p>
                            <p><strong>Email:</strong> {selectedCustomer.email}</p>
                            {/* Add other customer details here */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomerManager;
