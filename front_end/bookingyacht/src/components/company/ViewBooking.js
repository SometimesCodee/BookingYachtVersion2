import React from 'react';
import './Company.scss';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Company.scss'

const ViewBooking = () => {
    return (
        <>
            <div className='row my-4'>
                <h2 className='col-3'>Booking</h2>
                <FormGroup className='col-8 d-flex'>
                    <FormControl placeholder='Search' type='text' />
                    <Button className='btn btn-primary mx-3'>Search</Button>
                </FormGroup>

            </div>
            <div className='row container'>
                <div className="col-xl-12">
                    <div className="card mb-4 order-list">
                        <div className="gold-members p-4">
                            <a href="#">
                            </a>
                            <div className="media">
                                {/* <a href="#">
                                    <img className="mr-4" src="img/3.jpg" alt="Generic placeholder image" />
                                </a> */}
                                <div className="media-body">
                                    <a href="#">
                                        <span className="float-right text-success">Delivered on Mon, Nov 12, 7:18 PM <i className="feather-check-circle text-success" /></span>
                                    </a>
                                    <h6 className="mb-3"><a href="#">
                                    </a><a href="detail.html" className="text-dark">Gus's World Famous Fried Chicken
                                        </a>
                                    </h6>
                                    <p className="text-black-50 mb-1"><i className="feather-map-pin" /> 730 S Mendenhall Rd, Memphis, TN 38117, USA
                                    </p>
                                    <p className="text-black-50 mb-3"><i className="feather-list" /> ORDER #25102589748 <i className="feather-clock ml-2" /> Mon, Nov 12, 6:26 PM</p>
                                    <p className="text-dark">Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1
                                    </p>
                                    <hr />
                                    <div className='action d-flex'>
                                        <p className="mb-0 text-dark text-dark pt-2"><span className="text-dark font-weight-bold"> Total Paid:</span>  $300
                                        </p>
                                        <div className="float-right">
                                            {/* <a href="messages.html" className="btn btn-sm btn-warning"><i className="feather-message-circle" /> Message</a> */}
                                            <a href="#0" className="btn btn-sm btn-success"><i className="feather-check-circle" /> Approve</a>
                                            {/* <a href="#0" className="btn btn-sm btn-info" data-toggle="modal" data-target="#edit_booking"><i className="feather-edit" /> Edit</a> */}
                                            <a href="#0" className="btn btn-sm btn-danger"><i className="feather-trash" /> Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='page'>
                    <ReactPaginate
                        nextLabel="Next >"
                        // onPageChange=
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={3}
                        previousLabel="< Prev"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </>
    );
};

export default ViewBooking;