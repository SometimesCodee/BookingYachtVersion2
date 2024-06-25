import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCompanies } from '../../../redux/action/AdminAction';
import './Manager.scss';
const CompanyManager = () => {
    const getImageApi = `http://localhost:8080/api/customer/file/`
    const dispatch = useDispatch();
    const companies = useSelector(state => state.admin.companies);

    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const [showInfoDetailModal, setShowInfoDetailModal] = useState(false);
    const [newAccountId, setNewAccountId] = useState(null);
    const [companyDetail, setComPanyDetail] = useState({
        address: '',
        email: '',
        logo: null,
        name: ''
    })

    const [logo, setLogo] = useState(null);

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


    // const [showPassword, setShowPassword] = useState(false);
    const [createAccountMessage, setCreatetAccountMessage] = useState('');

    // Lấy khách hàng khi thành phần được tải
    useEffect(() => {
        dispatch(fetchCompanies())
    }, [dispatch]);

    useEffect(() =>{
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
        const username = form.elements.username.value;
        const password = form.elements.password.value;
        const confirmPassword = form.elements.confirmPassword.value;
        if (password !== confirmPassword) {
            setCreatetAccountMessage('Password and confirm password do not match.');
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
                    // 'Content-Type': 'multipart/form-data'
                },
                data: data
            };
            const response = await axios(config);
            if (response.data.data) {
                // setCreatetAccountMessage('Company created successfully.');
                toast.success('Company created successfully.')
                fetchCompanies();
                setNewAccountId(response.data.idAccount)
                console.log(newAccountId);
                setShowInfoDetailModal(true)
            } else {
                // setCreatetAccountMessage('Failed to create company. Please try again.');
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
        const data = new FormData();
        data.append('address', address);
        data.append('email', email);
        data.append('logo', logo);
        data.append('name', name);
        data.append('idAccount', newAccountId);

        try {
            const config = {
                method: 'post',
                url: `http://localhost:8080/api/admins/accounts/${newAccountId}`,
                headers: {
                    'Authorization': getAuthHeader(),
                    // 'Content-Type': 'multipart/form-data'
                },
                data: data
            };
            await axios(config);
            toast.success('Company details added successfully.');
            setShowInfoDetailModal(false);
            fetchCompanies();

            // Reset infomation
            setComPanyDetail({
                address: '',
                email: '',
                logo: null,
                name: ''
            });
            
            setLogo(null);
        } catch (error) {
            toast.error('Created infomation company false');
        }
    }

    
    const filterCompanies = (name, email, id) =>{
        const filtered = companies.filter(companies =>
            companies.name.toLowerCase().includes(name.toLowerCase()) &&
            companies.email.toLowerCase().includes(email.toLowerCase()) &&
            companies.idCompany.toLowerCase().includes(id.toLowerCase())
        )
        setFilteredCompanies(filtered)
    }
    const handleHideCompany = companyId => {
       
    };


    // Hàm đóng modal
    const handleCloseDetailModal = () => setShowDetailModal(false);

    // Hàm hiển thị modal với chi tiết khách hàng đã chọn
    const handleShowDetailModal = (company) => {
        setSelectedCompany(company);
        setShowDetailModal(true);
    };

    // Hàm thay đổi tùy chọn sắp xếp
    const handleSortChange = (key, direction) => {
        sortCompanys(key, direction);
    }

    // Hàm sắp xếp khách hàng theo khóa và hướng
    const sortCompanys = (key, direction) => {
        const sortedCustomers = [...filteredCompanies].sort((a, b) => {
            if (key === 'idCompany') {
                return direction === 'asc'
                    ? a[key] - b[key]
                    : b[key] - a[key];
            } else {
                if (a[key].toLowerCase() < b[key].toLowerCase()) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (a[key].toLowerCase() > b[key].toLowerCase()) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            }
        });

        setFilteredCompanies(sortedCustomers);
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
            <h1>Admin Manager</h1>
            <h2>Company Accounts</h2>
           <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                <label>Tìm kiếm theo Id</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search companies by ID"
                        value={searchId}
                        onChange={e => handleSearchById(e.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                <label>Tìm kiếm theo tên</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search companies name"
                        value={searchName}
                        onChange={e => handleSearchByName(e.target.value)}
                    />
                </div>
                <div>
                <label>Tìm kiếm theo email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search companies by email"
                        value={searchEmail}
                        onChange={e => handleSearchByEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='mb-3'>
                <div className='row'>
                    <div className='col d-flex justify-content-between'>
                        <DropdownButton id="dropdown-basic-button" title="Sort Options" variant='dark'>
                            <Dropdown.Item onClick={() => handleSortChange('idCompany', 'asc')}>ID Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('idCompany', 'desc')}>ID Descending</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('name', 'asc')}>Name Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('name', 'desc')}>Name Descending</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="success" onClick={() => setShowCompanyModal(true)} className="ml-2">Create Company Account</Button>
                    </div>
                </div>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Exist</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedCompany.map(company => (
                        <tr key={company.idCompany}>
                            <td>{company.idCompany}</td>
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
                                <Button variant="info" onClick={() => handleShowDetailModal(company)}>View Detail</Button>
                                <Button variant="danger" onClick={() => handleHideCompany(company.id)}>Hidden</Button>
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
                        <Button variant="dark" type="submit">
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
                            <img src={logo || `${getImageApi}${companyDetail.logo}`} alt="Company Logo" style={{ width: 200, marginTop: 20 }} />
                            <Form.Control
                                type='file'
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Button variant='dark' type='submit'>
                            Insert
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CompanyManager;