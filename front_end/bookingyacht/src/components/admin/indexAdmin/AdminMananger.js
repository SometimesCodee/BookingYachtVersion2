// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Button, Form, Modal, Table } from 'react-bootstrap';

// const AdminManager = () => {
//     const [companies, setCompanies] = useState([]);
//     const [customers, setCustomers] = useState([]);
//     const [bookingHistory, setBookingHistory] = useState([]);
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [showCompanyModal, setShowCompanyModal] = useState(false);
//     const [showCustomerModal, setShowCustomerModal] = useState(false);

//     useEffect(() => {
//         fetchCompanies();
//         fetchCustomers();
//     }, []);

//     const fetchCompanies = async () => {
//         try {
//             const response = await axios.get('https://reqres.in/api/users?page=1');
//             setCompanies(response.data.data);
//         } catch (error) {
//             console.error('Error fetching companies:', error);
//         }
//     };

//     const fetchCustomers = async () => {
//         try {
//             const response = await axios.get('https://reqres.in/api/users?page=2');
//             setCustomers(response.data.data);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//         }
//     };
//     const handleSearchCompany = value => {
//         // Add search logic here
//     };

//     const handleSearchCustomer = value => {
//         // Add search logic here
//     };

//     const handleCreateCompany = event => {
//         event.preventDefault();
//         const form = event.currentTarget;
//         const name = form.elements.name.value;
//         const email = form.elements.email.value;
//         // Add create company logic here
//         setShowCompanyModal(false);
//     };

//     const handleCreateCustomer = event => {
//         event.preventDefault();
//         const form = event.currentTarget;
//         const name = form.elements.name.value;
//         const email = form.elements.email.value;
//         // Add create customer logic here
//         setShowCustomerModal(false);
//     };

//     const handleDeleteCompany = companyId => {
//         // Add delete company logic here
//     };

//     const handleDeleteCustomer = customerId => {
//         // Add delete customer logic here
//     };

//     return (
//         <div className="container mt-5">
//             <h1>Admin Manager</h1>

//             <h2>Company Accounts</h2>
//             <div className="d-flex mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search company"
//                     onChange={e => handleSearchCompany(e.target.value)}
//                 />
//                 <Button variant="primary" onClick={() => setShowCompanyModal(true)} className="ml-2">
//                     Create Company Account
//                 </Button>
//             </div>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {companies.map(company => (
//                         <tr key={company.id}>
//                             <td>{company.id}</td>
//                             <td>{company.first_name} {company.last_name}</td>
//                             <td>{company.email}</td>
//                             <td>
//                                 <Button variant="info" onClick={() => setSelectedCompany(company)}>View</Button>
//                                 <Button variant="danger" onClick={() => handleDeleteCompany(company.id)}>Hidden</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <h2>Customer Accounts</h2>
//             <div className="d-flex mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search customer"
//                     onChange={e => handleSearchCustomer(e.target.value)}
//                 />
//             </div>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer.id}>
//                             <td>{customer.id}</td>
//                             <td>{customer.first_name} {customer.last_name}</td>
//                             <td>{customer.email}</td>
//                             <td>
//                                 <Button variant="info" onClick={() => setSelectedCustomer(customer)}>View</Button>
//                                 <Button variant="danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create Company Account</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleCreateCompany}>
//                         <Form.Group controlId="formCompanyName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter company name" name="name" required />
//                         </Form.Group>
//                         <Form.Group controlId="formCompanyEmail">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control type="email" placeholder="Enter company email" name="email" required />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Create
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             {/* <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create Customer Account</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleCreateCustomer}>
//                         <Form.Group controlId="formCustomerName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter customer name" name="name" required />
//                         </Form.Group>
//                         <Form.Group controlId="formCustomerEmail">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control type="email" placeholder="Enter customer email" name="email" required />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Create
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal> */}
//         </div>
//     );
// };

// export default AdminManager;
