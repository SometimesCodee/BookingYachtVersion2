import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Auth.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { fillInformationCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { information } from '../../redux/action/InformationAction';
import { Nav } from 'react-bootstrap';
import Language from '../header/Language';
import { useTranslation } from 'react-i18next';
const Information = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const { idAccount } = useParams();
    const { t } = useTranslation();

    const handleFillInformation = async () => {
        if (!email || !fullName || !phoneNumber || !address) {
            toast.error(t('forgot.errinput'))
        } else {
            let res = await fillInformationCustomer(idAccount, fullName.trim(), email.trim(), phoneNumber.trim(), address.trim());
            console.log(res)
            if (res && res.data.data === '1') {
                toast.error(t('fillinfor.erremail'))
            } else if (res && res.data.data === '2') {
                toast.error(t('fillinfor.errphone'))
            } else if (res && res.data.data === '999') {
                toast.error(t('fillinfor.dupliemail'))
            } else if (res && res.data.data === '888') {
                toast.error(t('fillinfor.dupliphone'))
            } else if (res && res.data.data === '0') {
                toast.success(t('fillinfor.success'));
                dispatch(information(email, fullName, phoneNumber, address));
                setEmail('');
                setAddress('');
                setFullName('');
                setPhoneNumber('');
                navigate('/signin');
            } else {
                toast.error(t('fillinfor.errfill'))
            }
        }
    }


    return (
        <div className='container my-5 py-5 px-5 form-infor' style={{ backgroundColor: "#C6F5F6", }}>

            <div className="d-flex justify-content-between">
                <h1>{t('fillinfor.inforuser')}</h1>
                <Nav>
                    <Language />
                </Nav>
            </div>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>{t('fillinfor.inforuser')}</Form.Label>
                        <Form.Control
                            type="email"
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>{t('fillinfor.fullname')}</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={event => setFullName(event.target.value)}
                        />

                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>{t('fillinfor.phone')}</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder={t('fillinfor.message')}
                            onChange={event => setPhoneNumber(event.target.value)}
                        />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>{t('fillinfor.address')}</Form.Label>
                        <Form.Control
                            type='text'
                            onChange={event => setAddress(event.target.value)}

                        />
                    </Form.Group>
                </Row>


                <div>
                    <Button
                        variant="primary"
                        onClick={() => handleFillInformation()}>
                        {t('fillinfor.send')}
                    </Button>
                </div>

            </Form>
        </div>
    );
};

export default Information;