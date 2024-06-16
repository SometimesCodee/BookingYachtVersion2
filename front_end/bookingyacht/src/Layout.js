import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import AdminLayout from './components/admin/headerAdmin/AdminLayout';
import LoginAdmin from './components/admin/loginAdmin/LoginAdmin';
import CompanyManager from './components/admin/managerAdmin/CompanyManager';
import CustomerManager from './components/admin/managerAdmin/CustomerManager';
import AdminHome from './components/admin/pageAdmin/AdminHome';
import ForgotPassword from './components/auths/ForgotPassword';
import Information from './components/auths/Information';
import InformationCompany from './components/auths/InformationCompany';
import Signin from './components/auths/Signin';
import Signup from './components/auths/Signup';
import Blog from './components/blog/Blog';
import Bill from './components/company/Bill';
import ManageCompany from './components/company/ManageCompany';
import ManageRoom from './components/company/ManageRoom';
import ManageYacht from './components/company/ManageYacht';
import ProfileCompany from './components/company/Profile';
import ViewBooking from './components/company/ViewBooking';
import ViewYacht from './components/company/ViewYacht';
import MainPage from './components/detailYacht/mainDetailPage/MainPage';
import Enterprise from './components/enterprise/Enterprise';
import HomePage from './components/home/HomePage';
import Profile from './components/home/Profile';
<<<<<<< HEAD
import ManageYacht from './components/company/ManageYacht';
import ManageRoom from './components/company/ManageRoom';
=======
import YachtQuestion from './components/yacht/YachtQuestion';
import YachtRule from './components/yacht/YachtRule';
>>>>>>> 5fb831ced9d9b8de9bf186a71d31458c914635f5
import FindYacht from './components/yacht/FindYacht';
const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/duthuyen' element={<FindYacht />} />
                    <Route path='/doanhnhiep' element={<Enterprise />} />
                    <Route path='/mainpage' element={<MainPage />} />
                    <Route path='/duthuyen' element={<FindYacht />} />
                    <Route path='/yacht-rule' element={<YachtRule />} />
                    <Route path='/yacht-question' element={<YachtQuestion />} />
                </Route>

                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/forgotpassowd' element={<ForgotPassword />}></Route>
                <Route path='/information' element={<Information />} />
                <Route path='/information-company' element={<InformationCompany />} />



                <Route path='/manage-company' element={<ManageCompany />} >
                    <Route index element={<ViewBooking />} />
                    <Route path='view-yacht' element={<ViewYacht />} />
                    <Route path='bill' element={<Bill />} />
                    <Route path='profile' element={<ProfileCompany />} />
                </Route>

                <Route path='manage-yacht' element={<ManageYacht />} />
                <Route path='manage-room' element={<ManageRoom />} />

                <Route path='/admin' element={<LoginAdmin setIsLoggedIn={setIsLoggedIn} />} />
                {
                    isLoggedIn && (
                        <Route path='/dashboard' element={<AdminLayout />}>
                            <Route path='manager' element={<AdminHome />} />
                            <Route path="customer" element={<CustomerManager />} />
                            <Route path="company" element={<CompanyManager />} />
                        </Route>
                    )
                }

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;