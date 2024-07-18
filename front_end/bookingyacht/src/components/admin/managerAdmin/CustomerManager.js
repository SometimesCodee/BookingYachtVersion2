import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCustomers } from '../../../redux/action/AdminAction';
import './Manager.scss';

const CustomerManager = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.admin.customers);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchId, setSearchId] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [paging, setPaging] = useState([]);
    const [pagedCustomers, setPagedCustomers] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'idCustomer', direction: 'asc' });

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCustomers(customers);
    }, [customers]);

    useEffect(() => {
        updatePaging();
    }, [filteredCustomers, currentPage]);

    const updatePaging = () => {
        const totalPages = Math.ceil(filteredCustomers.length / 10);
        setPaging(Array.from({ length: totalPages }, (_, i) => i + 1));
        setPagedCustomers(filteredCustomers.slice((currentPage - 1) * 10, currentPage * 10));
    };

    const handleSearchByName = value => {
        setSearchName(value);
        filterCustomers(value, searchEmail, searchId, searchPhone);
        setCurrentPage(1);
    };

    const handleSearchByEmail = value => {
        setSearchEmail(value);
        filterCustomers(searchName, value, searchId, searchPhone);
        setCurrentPage(1);
    };

    const handleSearchById = value => {
        setSearchId(value);
        filterCustomers(searchName, searchEmail, value, searchPhone);
        setCurrentPage(1);
    };

    const handleSearchByPhone = value => {
        setSearchPhone(value);
        filterCustomers(searchName, searchEmail, searchId, value);
        setCurrentPage(1);
    };

    const filterCustomers = (name, email, id, phone) => {
        const filtered = customers.filter(customer =>
            customer.fullName.toLowerCase().includes(name.toLowerCase()) &&
            customer.email.toLowerCase().includes(email.toLowerCase()) &&
            customer.idCustomer.toString().includes(id) &&
            customer.phone.includes(phone)
        );
        setFilteredCustomers(filtered);
    };

    const handleHideCustomer = customer => {
        setSelectedCustomer(customer);
        setShowConfirmModal(true);
    };

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

    const handleConfirmHideCustomer = async () => {
        try {
            const config = {
                method: 'put',
                url: `https://yachtbookingbackend.azurewebsites.net/api/admins/disableCustomer/${selectedCustomer.idCustomer}`,
                headers: {
                    'Authorization': getAuthHeader(),
                },
            };
            await axios(config);
            toast.success('Customer hidden successfully.');
            dispatch(fetchCustomers());
        } catch (error) {
            toast.error('Failed to hide customer. Please try again.');
        } finally {
            setShowConfirmModal(false);
            setSelectedCustomer(null);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleSortChange = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        sortCustomers(key, direction);
        setSortConfig({ key, direction });
    };

    const sortCustomers = (key, direction) => {
        const sortedCustomers = [...filteredCustomers].sort((a, b) => {
            if (key === 'idCustomer') {
                return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
            } else {
                return direction === 'asc'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
        });
        setFilteredCustomers(sortedCustomers);
        setCurrentPage(1);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setPagedCustomers(filteredCustomers.slice((currentPage - 1) * 10, currentPage * 10));
    }, [currentPage, filteredCustomers]);

    return (
        <div className="container mt-5">
            <div>
                <h1>Admin Manager</h1>
                <h2>Customer Accounts</h2>
            </div>
            <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                    <label>Tìm kiếm theo Id</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by ID"
                        value={searchId}
                        onChange={e => handleSearchById(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tìm kiếm theo phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by phone"
                        value={searchPhone}
                        onChange={e => handleSearchByPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                    <label>Tìm kiếm theo tên</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by name"
                        value={searchName}
                        onChange={e => handleSearchByName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tìm kiếm theo email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by email"
                        value={searchEmail}
                        onChange={e => handleSearchByEmail(e.target.value)}
                    />
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSortChange('idCustomer')}>
                            ID {sortConfig.key === 'idCustomer' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                        </th>
                        <th onClick={() => handleSortChange('fullName')}>
                            Họ Và Tên {sortConfig.key === 'fullName' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                        </th>
                        <th onClick={() => handleSortChange('email')}>
                            Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                        </th>
                        <th>Số Điện Thoại</th>
                        <th>Địa chỉ</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedCustomers.map(customer => (
                        <tr key={customer.idCustomer}>
                            <td>{customer.idCustomer}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td className='button_mana'>
                                <Button variant="info" onClick={() => handleShowModal(customer)}>Chi tiết</Button>
                                <Button variant="danger" onClick={() => handleHideCustomer(customer)}>Vô Hiệu Hóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {paging.map(page => (
                    <Button
                        key={page}
                        style={{ marginLeft: 5 }}
                        onClick={() => handlePageChange(page)}
                        className='btn-dark'
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCustomer && (
                        <>
                            <p><strong>ID:</strong> {selectedCustomer.accountDTO.idAccount}</p>
                            <p><strong>Username:</strong> {selectedCustomer.accountDTO.username}</p>
                            <p><strong>Password:</strong> {selectedCustomer.accountDTO.password}</p>
                            <p><strong>Role:</strong> {selectedCustomer.accountDTO.role}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Hide Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleConfirmHideCustomer}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomerManager;
