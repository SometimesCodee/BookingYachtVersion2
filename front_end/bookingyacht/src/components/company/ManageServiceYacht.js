import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { AiFillHome } from "react-icons/ai";
import { NavLink, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createServiceYacht, deleteServiceYacht, getAllServices, getServiceByYacht, upadteServiceYacht } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { BiSolidEditAlt } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import ModalUpdateServiceYacht from './Modal/ModalUpdateServiceYacht';
import { GoArrowDown } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";




const ManageServiceYacht = () => {
    const { idYacht } = useParams();
    // const [services, setServices] = useState([]);
    const [showModalUpdateServiceYacht, setShowModalUpdateServiceYacht] = useState(false);

    const [yachtServices, setYachtServices] = useState([]);
    const [service, setSurvice] = useState('');
    const [price, setPrice] = useState('');
    const [idService, setIdService] = useState('');
    const [serviceUpdate, setServiceUpdate] = useState({});

    useEffect(() => {
        // getServices();
        getServiceYacht();
    }, [])

    const handleClose = () => {
        setShowModalUpdateServiceYacht(false)
    }

    // const getServices = async () => {
    //     let res = await getAllServices();
    //     console.log(res)
    //     if (res && res.data.data.length > 0) {
    //         setServices(res.data.data);

    //     } else {
    //         toast.info('Not Found Service');
    //     }
    // }

    const getServiceYacht = async () => {
        let res = await getServiceByYacht(idYacht);
        if (res && res.data.data.length > 0) {
            setYachtServices(res.data.data);
        } else {
            toast.info('Not Found Services By Yacht')
        }
    }

    const handleCreateYachtSurvice = async () => {
        let res = await createServiceYacht(idYacht.trim(), service.trim(), price.trim());
        if (!service || !price) {
            toast.error('Input Not Empty');
        } else {
            if (res && res.data.data === true) {
                toast.success('Create Service Yacht Successfully')
                getServiceYacht();
            } else {
                toast.error('Create Fail')
            }
        }
    }

    const handleUpdateServiceYacht = (Service) => {
        setShowModalUpdateServiceYacht(true);
        setServiceUpdate(Service)
    }

    const handleDeleteServiceYacht = async (service) => {
        if (window.confirm(`You Want To Delete service ${service.service}`)) {
            let res = await deleteServiceYacht(idYacht, service.idService)
            console.log('dele', res)
            if (res && res.data.data === true) {
                toast.success('Delete Successfully')
                getServiceYacht();
            } else {
                toast.error('Delete Fail')
            }
        }
    }
    const handleSortByPriceDown = () => {
        const newList = [...yachtServices].sort((a, b) => a.price - b.price);
        setYachtServices(newList);
    }


    const handleSortByPriceUp = () => {
        const newList = [...yachtServices].sort((a, b) => b.price - a.price);
        setYachtServices(newList);
    }

    return (
        <div>
            <div>
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='' /> <p className='mb-0'>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <div className='container'>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Create Service Yacht</Accordion.Header>
                        <Accordion.Body>
                            <Form>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Price Service'
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Service</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Service Yacht'
                                            value={service}
                                            onChange={e => setSurvice(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Service</Form.Label>
                                        <Form.Select >
                                            {
                                                services && services.length > 0 && services.map((service, index) =>
                                                    <option key={index} value={service.idService} >{service.service}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group> */}


                                </Row>
                                <Button onClick={handleCreateYachtSurvice} variant="success">
                                    Create
                                </Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div
                    className="table-responsive my-5"
                >
                    <table
                        className="table table-striped table-hover table-borderless table-primary align-middle"
                    >
                        <thead className="table-light">
                            <caption>
                                List Services
                            </caption>
                            <tr>
                                <th>Service</th>
                                <th>
                                    Price
                                    <GoArrowDown onClick={handleSortByPriceDown} style={{ cursor: 'pointer' }} />
                                    <GoArrowUp onClick={handleSortByPriceUp} style={{ cursor: 'pointer' }} />
                                </th>
                                <th className='text-center'>Action</th>

                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                yachtServices && yachtServices.length > 0 && yachtServices.map((service) =>

                                    <tr key={service.idService}
                                        className="table-primary"
                                    >
                                        <td>{service.service}</td>
                                        <td>{service.price}</td>
                                        <td>
                                            <div className='d-flex' style={{ gap: 50, justifyContent: 'center' }}>
                                                <div onClick={() => handleUpdateServiceYacht(service)} style={{ cursor: 'pointer', color: 'blue' }}>
                                                    <BiSolidEditAlt size={25} />
                                                    <label className='mx-2'>Edit</label>
                                                </div>
                                                <div onClick={() => handleDeleteServiceYacht(service)} style={{ cursor: 'pointer', color: 'red' }}>
                                                    <FaDeleteLeft size={25} />
                                                    <label className='mx-2'>Delete</label>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>
            </div>
            <ModalUpdateServiceYacht
                show={showModalUpdateServiceYacht}
                serviceUpdate={serviceUpdate}
                handleClose={handleClose}
                idYacht={idYacht}
                getServiceYacht={getServiceYacht}
            />

        </div >

    );
};

export default ManageServiceYacht;