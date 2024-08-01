import React, { useState } from 'react';
import logo from '../../assets/logo_swp.png'
import { registerCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoChevronBackSharp } from "react-icons/io5";
import { Nav } from 'react-bootstrap';
import Language from '../header/Language';
import { useTranslation } from 'react-i18next';



const Signup = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfirmpassword] = useState('')

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleRegister = async () => {
        var regexp = /^\S+$/;
        if (userName === '' || password === '' || confrimPassword === '') {
            toast.error(t('login.input'))
        } else if (!userName.match(regexp)) {
            toast.error(t('register.errspace'))
        }
        else if (userName.length < 3) {
            toast.error(t('register.errcuser'))
        } else if (password.length < 8) {
            toast.error(t('register.errpass'))
        }
        else if (confrimPassword.trim() !== password.trim()) {
            toast.error(t('register.errconfirm'));
        } else {
            let res = await registerCustomer(userName.trim(), password.trim());
            if (res && res.data.data === true) {
                toast.success(t('register.success'))
                navigate(`/information/${res.data.desc}`)
            } else {
                toast.error(t('register.userexit'))
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e && e.key === 'Enter') {
            handleRegister()
        }
    }

    return (
        <div >
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <Nav style={{ display: 'flex', flexFlow: "row-reverse", marginRight: '30px' }}>
                    <Language />
                </Nav>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{t('register.signup')}</p>
                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text"
                                                            placeholder={t('login.username')}
                                                            className="form-control"
                                                            value={userName}
                                                            onKeyDown={e => handleKeyDown(e)}
                                                            onChange={(event) => setUserName(event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password"
                                                            placeholder={t('login.password')}
                                                            className="form-control"
                                                            value={password}
                                                            onKeyDown={e => handleKeyDown(e)}
                                                            onChange={(event) => setPassword(event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa-solid fa-key fa-lg me-3"></i>
                                                    <div className="form-outline flex-fill mb-0 mx-1">
                                                        <input type="password"
                                                            placeholder={t('register.confirm')}
                                                            className="form-control"
                                                            value={confrimPassword}
                                                            onKeyDown={e => handleKeyDown(e)}
                                                            onChange={(event) => setConfirmpassword(event.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {t('register.haveaccount')}
                                                <Link to='/signin'>{t('register.signin')}</Link>
                                                <div>
                                                    <div className="d-flex justify-content-center my-2 mx-4 mb-3 mb-lg-4" >
                                                        <button type="button"
                                                            className="btn btn-primary btn-lg"
                                                            onClick={() => handleRegister()}
                                                        >{t('register.dosignup')}</button>

                                                    </div>
                                                    <Link to='/signin' style={{ textDecoration: "none" }}><IoChevronBackSharp className='mb-1' />{t('register.back')}</Link>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <NavLink to='/' className='nav-link'><img src={logo} className="img-fluid" alt="logo" /></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Signup;