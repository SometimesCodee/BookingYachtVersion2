import React from 'react';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-5">
                                        <h2 className="h3">Forgot Password</h2>
                                        <h3 className="fs-6 fw-normal text-secondary m-0">Provide the email address associated with your account to recover your password.</h3>
                                    </div>
                                </div>
                            </div>
                            <form action="#!">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required />
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button className="btn btn-lg btn-primary" type="submit">Send</button>
                                        </div>
                                        <div className='text-center'>
                                            <NavLink to='/signin' className='my-4'>Back</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ForgotPassword;