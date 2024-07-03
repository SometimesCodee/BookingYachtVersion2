import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import ModalUpdateProfileUser from './ModalUpdateProfileUser';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import { getProfileCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import BookingOrderHistory from './BookingOrderHistory';

const Profile = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const idCustomer = useSelector(state => state.account.account.idCustomer);

    useEffect(() => {
        getProfile();
    }, [])


    const [profile, setProfile] = useState({});
    const handleClose = () => {
        setIsShowModal(false);
    }

    const getProfile = async () => {
        let res = await getProfileCustomer(idCustomer);
        if (res && res.data.data !== null) {
            setProfile(res.data.data);
        } else (
            toast.error('Please Fill Information')
        )
    }

    const handleUpdateProfile = () => {
        setIsShowModal(true);
    }

    return (
        <div className="container emp-profile my-3">
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >

                <Tab eventKey="profile" title="Profile">
                    <form>
                        <div className="row">

                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h2>
                                        {profile.fullName}
                                    </h2>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <Button className='btn btn-infor' onClick={() => handleUpdateProfile()}>Edit Profile</Button>
                                <Link to='/' className='mx-5' style={{ textDecoration: "none" }}><FaHome className='mb-1' /> Home</Link>
                            </div>
                        </div>
                        <div className="row my-5">

                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{profile.idCustomer}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{profile.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{profile.phone}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="Booking History" title="Booking History" >
                  <BookingOrderHistory/>
                </Tab>
            </Tabs>


            <ModalUpdateProfileUser
                show={isShowModal}
                handleClose={handleClose}
                profile={profile}
                getProfile={getProfile}
            />
        </div>

    );
};

export default Profile;