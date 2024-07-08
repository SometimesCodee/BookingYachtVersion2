import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _ from 'lodash';
import { updateProfileCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
const ModalUpdateProfileUser = (props) => {
    const { show, handleClose, profile } = props;
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (!_.isEmpty(profile)) {
            setEmail(profile.email);
            setFullName(profile.fullName);
            setAddress(profile.address);
            setPhoneNumber(profile.phone);
        }
    }, [profile])


    const handleUpodateProfile = async () => {
        if (!email || !fullName || !phoneNumber || !address) {
            toast.error('Input Not Empty');
        } else {

            let res = await updateProfileCustomer(profile.idCustomer, email.trim(), fullName.trim(), phoneNumber.trim(), address.trim());
            if (res && res.data.data === true) {
                toast.success('Update Successfully')
                handleClose();
                await props.getProfile();
            } else {
                toast.error('Update Fail')
            }
        }
    }

    return (
        <div>
            <Modal size='xl' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>FullName</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fullName}
                                    onChange={event => setFullName(event.target.value)}

                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>PhoneNumber</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder='Start With 0 and 9 Number'
                                    value={phoneNumber}
                                    onChange={event => setPhoneNumber(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                            </Form.Group>
                        </Row>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpodateProfile}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalUpdateProfileUser;