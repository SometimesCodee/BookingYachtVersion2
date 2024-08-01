import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCompanies } from '../../../redux/action/AdminAction';
import './Manager.scss';
const CompanyManager = () => {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.admin.companies);

    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showInfoDetailModal, setShowInfoDetailModal] = useState(false);
    const [newAccountId, setNewAccountId] = useState(null);
    const [companyDetail, setComPanyDetail] = useState({
        address: '',
        email: '',
        logo: null,
        name: ''
    })

    const [logo, setLogo] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'idCompany', direction: 'asc' });
    useEffect(() => {
        if (companyDetail.logo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(companyDetail.logo);
        } else {
            setLogo(null);
        }
    }, [companyDetail.logo])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setComPanyDetail({ ...companyDetail, logo: file });
        }
    };

    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchId, setSearchId] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [paging, setPaging] = useState([]);
    const [pagedCompany, setPagedCompanys] = useState([]);

    const [createAccountMessage, setCreatetAccountMessage] = useState('');

    // Lấy khách hàng khi thành phần được tải
    useEffect(() => {
        dispatch(fetchCompanies())
    }, [dispatch]);

    useEffect(() => {
        setFilteredCompanies(companies);
    }, [companies])

    // Cập nhật phân trang mỗi khi danh sách khách hàng được lọc thay đổi
    useEffect(() => {
        updatePaging();
    }, [filteredCompanies, currentPage]);

    // Hàm lấy tiêu đề xác thực từ localstorage
    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

    // Hàm cập nhật phân trang
    const updatePaging = () => {
        // Tính tổng số trang
        const totalPages = Math.ceil(filteredCompanies.length / 10);
        // Tạo một mảng số trang
        setPaging(Array.from({ length: totalPages }, (_, i) => i + 1));
        // Đặt khách hàng cho trang hiện tại
        setPagedCompanys(filteredCompanies.slice((currentPage - 1) * 10, currentPage * 10));
    };

    const handleSearchByName = value => {
        setSearchName(value);
        filterCompanies(value, searchEmail, searchId)

        setCurrentPage(1);
    };

    // Hàm tìm kiếm khách hàng theo tên
    const handleSearchByEmail = value => {
        setSearchEmail(value);
        filterCompanies(searchName, value, searchId)

        setCurrentPage(1);
    };

    const handleSearchById = value => {
        setSearchId(value);
        filterCompanies(searchName, searchEmail, value);
        setCurrentPage(1);
    };

    //Hàm tạo tài khoản cho company
    const handleCreateCompany = async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = form.elements.username.value.trim();
        const password = form.elements.password.value.trim();
        const confirmPassword = form.elements.confirmPassword.value.trim();
        // Kiểm tra điều kiện cho tên tài khoản
        if (username.length < 3 || !/^[a-zA-Z]/.test(username) || username.includes(' ')) {
            toast.error('Tên tài khoản phải bắt đầu bằng một chữ cái và có ít nhất 3 ký tự và không chứa dấu cách!');
            return;
        }
        // Kiểm tra điều kiện cho mật khẩu
        if (password.length < 8) {
            toast.error('Mật khẩu phải có ít nhất 8 ký tự!');
            return;
        }
        if (password !== confirmPassword) {
            setCreatetAccountMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }
        const FormData = require('form-data');
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        try {
            const config = {
                method: 'post',
                url: 'http://localhost:8080/api/admins/accounts',
                headers: {
                    'Authorization': getAuthHeader(),
                },
                data: data
            };
            const response = await axios(config);
            if (response.data.data) {
                toast.success('Tạo tài khoản công ty thành công.')
                fetchCompanies();
                setNewAccountId(response.data.idAccount)
                setShowInfoDetailModal(true)
            } else {
                toast.error("Tạo tài khoản không thành công, tài khoản này có thể đã tồn tại.")
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setCreatetAccountMessage('Account already exists.');
            } else {
                setCreatetAccountMessage('Error creating company. Please try again.');
            }
        }
        setShowCompanyModal(false);
    };

    const handleSubmitCompanyDetail = async event => {
        event.preventDefault();
        const { address, email, logo, name } = companyDetail;
        if (!email.includes('@')) {
            toast.error('Email phải đúng định dạng');
            return;
        }
        const data = new FormData();
        data.append('address', address.trim());
        data.append('email', email.trim());
        data.append('logo', logo);
        data.append('name', name.trim());
        data.append('idAccount', newAccountId);

        try {
            const config = {
                method: 'post',
                url: `http://localhost:8080/api/admins/accounts/${newAccountId}`,
                headers: {
                    'Authorization': getAuthHeader(),
                },
                data: data
            };
            const response = await axios(config);
            if (response.data.data === false) {
                toast.error('Thêm thông tin không thành công, email này có thể đã tồn tại !')
            } else {
                toast.success('Bạn vừa tạo một công ty thành công.');
                setShowInfoDetailModal(false);
                dispatch(fetchCompanies());

                // Reset infomation
                setComPanyDetail({
                    address: '',
                    email: '',
                    logo: null,
                    name: ''
                });

                setLogo(null);
            }

        } catch (error) {
            toast.error('Tạo công ty không thành công');
        }
    }


    const filterCompanies = (name, email, id) => {
        const filtered = companies.filter(companies =>
            companies.name.toLowerCase().includes(name.toLowerCase()) &&
            companies.email.toLowerCase().includes(email.toLowerCase()) &&
            companies.idCompany.toLowerCase().includes(id.toLowerCase())
        )
        setFilteredCompanies(filtered)
    }
    const handleHideCompany = company => {
        setSelectedCompany(company);
        setShowConfirmModal(true);
    };

    const handleConfirmHideCompany = async () => {
        try {
            const config = {
                method: 'put',
                url: `http://localhost:8080/api/admins/companies/${selectedCompany.idCompany}`,
                headers: {
                    'Authorization': getAuthHeader(),
                },
            };
            await axios(config);
            toast.success('Thao tác thành công.');
            dispatch(fetchCompanies())
        } catch (error) {
            toast.error('Công ty này đã bị ẩn không thành công. Please try again.');
        } finally {
            setShowConfirmModal(false);
            setSelectedCompany(null);
        }
    }

    // Hàm đóng modal
    const handleCloseDetailModal = () => setShowDetailModal(false);

    // Hàm hiển thị modal với chi tiết khách hàng đã chọn
    const handleShowDetailModal = (company) => {
        setSelectedCompany(company);
        setShowDetailModal(true);
    };

    // Hàm thay đổi tùy chọn sắp xếp
    const handleSortChange = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        sortCompanys(key, direction);
        setSortConfig({ key, direction });
    }

    // Hàm sắp xếp khách hàng theo khóa và hướng
    const sortCompanys = (key, direction) => {
        const sortedCompanies = [...filteredCompanies].sort((a, b) => {
            if (key === 'idCompany') {
                return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
            } else {
                const aValue = a[key] || '';
                const bValue = b[key] || '';
                return direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
        });

        setFilteredCompanies(sortedCompanies);
        setCurrentPage(1);
    };

    // Hàm thay đổi trang hiện tại
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Cập nhật danh sách khách hàng trên trang mỗi khi trang hiện tại hoặc danh sách khách hàng đã lọc thay đổi
    useEffect(() => {
        setPagedCompanys(filteredCompanies.slice((currentPage - 1) * 10, currentPage * 10));
    }, [currentPage, filteredCompanies]);

    return (
        <div className="container mt-5">
            <h1 style={{ fontWeight: 'bold' }}>Admin Manager</h1>
            <h2>Company Accounts</h2>
            <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                    <label>Tìm Kiếm Theo Tên</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search companies name"
                        value={searchName}
                        onChange={e => handleSearchByName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tìm Kiếm Theo Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search companies by email"
                        value={searchEmail}
                        onChange={e => handleSearchByEmail(e.target.value)}
                    />
                </div>
            </div>
            <Button variant="success" onClick={() => setShowCompanyModal(true)} className="ml-2 mt-2 mb-2">Tạo Tài Khoản</Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th onClick={() => handleSortChange('name')} style={{ textAlign: 'center' }}>
                            Họ Và Tên {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                        </th>
                        <th style={{ textAlign: 'center' }}>Địa Chỉ</th>
                        <th onClick={() => handleSortChange('email')} style={{ textAlign: 'center' }}>
                            Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                        </th>
                        <th style={{ textAlign: 'center' }}>Trạng Thái</th>
                        <th style={{ textAlign: 'center' }}>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedCompany.map(company => (
                        <tr key={company.idCompany}>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>{company.email}</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                {company.exist === 1 ? (
                                    <h5 style={{ margin: 0 }}>
                                        <span style={{ color: "green" }}>&#9679;</span>
                                    </h5>
                                ) : (
                                    <h5 style={{ margin: 0 }}>
                                        <span style={{ color: "red" }}>&#9679;</span>
                                    </h5>
                                )}
                            </td>
                            <td className='button_mana'>
                                <Button variant="info" onClick={() => handleShowDetailModal(company)}>Chi Tiết</Button>
                                <Button variant={company.exist ? 'danger' : 'success'}
                                    onClick={() => handleHideCompany(company)}>
                                    {company.exist ? 'Chặn' : 'Bỏ Chặn'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    paging.map(page => (
                        <Button
                            key={page}
                            style={{ marginLeft: 5 }}
                            onClick={() => handlePageChange(page)}
                            className='btn-dark'
                        >
                            {page}
                        </Button>
                    ))
                }
            </div>
            <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Company Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateCompany}>
                        <Form.Group controlId="formCompanyUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" name="username" required />
                        </Form.Group>
                        <Form.Group controlId="formCompanyPassword">
                            <Form.Label>Password</Form.Label>
                            <div className="password-input">
                                <Form.Control type='password' placeholder="Enter password" name="password" required />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formCompanyConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder="Confirm password" name="confirmPassword" required />
                        </Form.Group>
                        {createAccountMessage && <p className="text-danger">{createAccountMessage}</p>}
                        <Button variant="dark" type="submit" className='mt-2 mb-2'>
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDetailModal} onHide={handleCloseDetailModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Company Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCompany && (
                        <>
                            <p><strong>ID:</strong> {selectedCompany.accountDTO.idAccount}</p>
                            <p><strong>Username:</strong> {selectedCompany.accountDTO.username}</p>
                            <p><strong>Password:</strong> {selectedCompany.accountDTO.password}</p>
                            <p><strong>Role:</strong> {selectedCompany.accountDTO.role}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInfoDetailModal} onHide={() => setShowInfoDetailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Infomation Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitCompanyDetail}>
                        <Form.Group controlId='formCompanyName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter company name'
                                value={companyDetail.name}
                                onChange={e => setComPanyDetail({ ...companyDetail, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='formCompanyAddress'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter company address'
                                value={companyDetail.address}
                                onChange={e => setComPanyDetail({ ...companyDetail, address: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='formCompanyEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter company email'
                                value={companyDetail.email}
                                onChange={e => setComPanyDetail({ ...companyDetail, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='formCompanyLogo'>
                            <Form.Label>Logo</Form.Label>
                            <img src={logo || `${companyDetail.logo}`} alt="Company Logo" style={{ width: 200, marginTop: 20 }} />
                            <Form.Control
                                type='file'
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Button variant='dark' type='submit' className='mt-2 mb-2'>
                            Insert
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Hide Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCompany?.exist
                        ? 'Bạn có chắc chắn muốn ẩn công ty này không?'
                        : 'Bạn có chắc chắn muốn bỏ ẩn công ty này không?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleConfirmHideCompany}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CompanyManager;