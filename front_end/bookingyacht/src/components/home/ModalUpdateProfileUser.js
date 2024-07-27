import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _, { add } from 'lodash';
import { updateProfileCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { Today } from '@mui/icons-material';
import { getAllCustomerInfor } from '../../services/ApiServices';
const ModalUpdateProfileUser = (props) => {
    const { show, handleClose, profile } = props;
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [customers, setCustomers] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await getAllCustomerInfor();
                setCustomers(res.data.data);
            } catch (error) {
                console.error('Failed to fetch customers:', error);
            }
        };
        fetchCustomers();
    }, [])

    const validatePhoneNumber = (value) => {
        if (!/^[0]\d{9}$/.test(value)) {
            return 'Phone number must start with 0 and be 10 digits long';
        }
        if (customers.some(customer => customer.phone === value && customer.phone !== profile.phone)) {
            return 'Phone number already exists';
        }
        return true;
    };

    const validateFullName = (value) => {
        if (value.length < 6) {
            return 'Full name must be at least 6 characters long';
        }
        return true;
    };

    const validateEmail = (value) => {
        const isExist = customers.some(customer => customer.email === value && customer.email !== profile.email);
        if (isExist) {
            return 'Email already exists';
        }
        return true;
    }

    console.log('customer', customers);

    useEffect(() => {
        if (!_.isEmpty(profile)) {
            setEmail(profile.email);
            setFullName(profile.fullName);
            setAddress(profile.address);
            setPhoneNumber(profile.phone);
        }
    }, [profile])

    const onSubmit = async (data) => {
        const { email, fullName, phoneNumber, address } = data;

        if (!email || !fullName || !phoneNumber || !address) {
            toast.error('Please fill in all fields');
        } else {
            let res = await updateProfileCustomer(profile.idCustomer, email.trim(), fullName.trim(), phoneNumber.trim(), address.trim());
            if (res && res.data.data === true) {
                console.log('res', res.data.data);
                toast.success('Update Successfully');
                handleClose();
                await props.getProfile();
            } else {
                toast.error('Update Fail');
            }
        }
    };

    return (
        <div>
            <Modal size='xl' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    {...register('email', { required: 'Email is required', validate: validateEmail })}
                                    isInvalid={!!errors.email}
                                    defaultValue={profile.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('fullName', { validate: validateFullName })}
                                    isInvalid={errors.fullName}
                                    defaultValue={profile.fullName}

                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhoneNumber">
                                <Form.Label>PhoneNumber</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Start with 0 and 9 digits'
                                    {...register('phoneNumber', { validate: validatePhoneNumber })}
                                    isInvalid={errors.phoneNumber}
                                    defaultValue={profile.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('address', { required: 'Address is required' })}
                                    isInvalid={errors.address}
                                    defaultValue={profile.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default ModalUpdateProfileUser;