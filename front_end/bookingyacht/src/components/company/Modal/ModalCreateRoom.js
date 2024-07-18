import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap'
import { FcPlus } from "react-icons/fc";
import { createRoom, getAllRoomTypeCompany } from '../../../services/ApiServices';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const ModalCreateRoom = (props) => {
    const { show, setIsShowModalCreateRoom, idYacht, listRoomType, fetchRoomType } = props;
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [roomName, setRoomName] = useState('');
    const [area, setArea] = useState(0);
    const [description, setDescription] = useState('');
    const [roomType, setRoomType] = useState('');

    useEffect(() => {
        if (show) {
            fetchRoomType();
        }
    }, [show])

    useEffect(() => {
        if (show && _.isEmpty(listRoomType)) {
            toast.warning('Please create room type before creating room')
        }

    }, [show, listRoomType])

    const handleClose = () => {
        setIsShowModalCreateRoom(false);
        setRoomName('');
        setArea('');
        setDescription('');
        setRoomType('');
        setPreviewImage('');
        setImage('');
    }

    console.log('type', roomType)
    console.log('list', listRoomType)
    const handelUploadImage = (event) => {
        if (event.target.files[0] && event.target && event.target.files) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }
    const handleCreateRoom = async () => {
        if (!roomName || !area || !description || !roomType || !previewImage || !image) {
            toast.error('Input Not Empty')
        } else {
            let res = await createRoom(roomName.trim(), area, description.trim(), roomType, image, idYacht)
            if (res && res.data.data === true) {
                toast.success('Create Successfully');
                handleClose();
                await props.getAllRoom()
            } else {
                toast.error('Create Fail')
            }
        }
    }


    return (
        <div>
            <Modal size='xl'
                show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-add-new-yacht'
                autoFocus

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Room Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={roomName}
                                    onChange={event => setRoomName(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Area</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter area in m²"
                                    value={area}
                                    onChange={event => setArea(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Room Type</Form.Label>
                                <Form.Select value={roomType} onChange={event => setRoomType(event.target.value)} >
                                    {

                                        listRoomType && listRoomType.map((type) =>
                                            <option key={type.idRoomType} value={type.idRoomType}>{type.utilities}</option>
                                        )
                                    }

                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />

                        </Row>
                        <div className='col-mad-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'> <FcPlus /> Upload File IMAGE</label>
                            <input
                                type='file'
                                accept='image/*'
                                hidden id='labelUpload'
                                name='image'
                                onChange={(event) => handelUploadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Avatar</span>
                            }
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateRoom}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCreateRoom;