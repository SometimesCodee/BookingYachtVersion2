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
import DetailEnterprise from './components/enterprise/DetailEnterprise';
import Enterprise from './components/enterprise/Enterprise';
import HomePage from './components/home/HomePage';
import Profile from './components/home/Profile';
import FindYacht from './components/yacht/FindYacht';
import YachtQuestion from './components/yacht/YachtQuestion';
import YachtRule from './components/yacht/YachtRule';

import ManageSchedule from './components/company/ManageSchedule';
import ManageServiceYacht from './components/company/ManageServiceYacht';
import Page404 from './components/page404/Page404';
import ProtectedRoute from './components/routers/ProtectedRoute';


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
                    <Route path='/mainpage/:yachtId' element={<MainPage />} />
                    <Route path='/yacht-rule' element={<YachtRule />} />
                    <Route path='/yacht-question' element={<YachtQuestion />} />
                </Route>

                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />
                }
                />
                <Route path='/profile' element={<Profile />} />
                <Route path='/forgotpassowd' element={<ForgotPassword />}></Route>
                <Route path='/information/:idCustomer' element={<Information />} />
                {/* <Route path='/information-company' element={<InformationCompany />} /> */}


                <Route path='/manage-company' element={
                    <ProtectedRoute>
                        <ManageCompany />
                    </ProtectedRoute>

                } >
                    <Route index element={<ViewBooking />} />
                    <Route path='view-yacht' element={<ViewYacht />} />
                    <Route path='bill' element={<Bill />} />
                    <Route path='profile' element={<ProfileCompany />} />

                </Route>

                <Route path='manage-yacht/:idYacht' element={<ManageYacht />} />
                <Route path='manage-room/:idYacht' element={<ManageRoom />} />
                <Route path='manage-services-yacht/:idYacht' element={<ManageServiceYacht />} />
                <Route path='manage-schedule/:idYacht' element={<ManageSchedule />} />

                <Route path='/admin' element={<LoginAdmin setIsLoggedIn={setIsLoggedIn} />} />
                {
                    isLoggedIn && (
                        <Route path='/dashboard' element={<AdminLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route path="customer" element={<CustomerManager />} />
                            <Route path="company" element={<CompanyManager />} />
                        </Route>
                    )
                }
                <Route path='/deltailInfo/:idCompany' element={<DetailEnterprise />} />

                <Route path='*' element={<Page404 />} />

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