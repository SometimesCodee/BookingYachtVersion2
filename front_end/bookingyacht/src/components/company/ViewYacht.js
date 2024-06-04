import React from 'react';
import { Button } from 'react-bootstrap'
import { FcPlus } from "react-icons/fc";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new yacht
            </Button>

            <Modal size='xl' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Yacht</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name Yacht" />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Price" />
                            </Form.Group>
                        </Row>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



const ViewYacht = () => {
    return (
        <div>
            <h2>List Yacht</h2>
            <Button className='my-3'><FcPlus className='mx-3' /> Add New Yacht</Button>

            <Example />
            <div
                class="table-responsive container"
            >
                <table
                    class="table table-striped table-hover table-bordered table-primary align-middle"
                >

                    <thead class="table-light">

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr
                            class="table-primary"
                        >
                            <td scope="row">1</td>
                            <td>Cruise Ha Long</td>
                            <td>21.000.0000</td>
                        </tr>
                        <tr
                            class="table-primary"
                        >
                            <td scope="row">Item</td>
                            <td>Item</td>
                            <td>Item</td>
                        </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>

        </div>
    );
};

export default ViewYacht;