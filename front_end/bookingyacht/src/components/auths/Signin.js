import logo from '../../assets/logo_swp.png';
import './Auth.scss';
import { useState } from 'react';
import { getIdCustomer, login } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { ImSpinner10 } from "react-icons/im";
import { doLogin } from '../../redux/action/UserAction';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { BiSolidHome } from "react-icons/bi";
import { useTranslation } from 'react-i18next';
import Language from '../header/Language';
import { Nav } from 'react-bootstrap';

const Signin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();


    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true)
        if (userName === '' || password === '') {
            toast.error(t('login.input'));
            setLoading(false);
        } else {
            let res = await login(userName.trim(), password.trim());
            console.log('login', res)
            if (res === undefined) {
                toast.error(t("login.accountExits"))
                setLoading(false);
                return;
            } else if (res && res.data && res.data.data) {
                const role = jwtDecode(res.data.data);
                let resAccount = await getIdCustomer(res.data.idAccount);

                dispatch(doLogin(res.data.data, role.role, res.data.idCompany ? res.data.idCompany : "", res.data.idCustomer ? res.data.idCustomer : ""))
                if (res && res.data && res.data.data === 'Invalid credentials') {
                    toast.error(t('login.erruser'))
                    setLoading(false);
                }
                if (role && role.role === 'ROLE_COMPANY') {
                    setLoading(false);
                    toast.success(t('login.success'));
                    navigate(`/manage-company`);
                } else if (role && role.role === 'ROLE_CUSTOMER') {
                    setLoading(false);
                    if (resAccount && resAccount.data && resAccount.data.data === '0') {
                        toast.error("Hãy Điền Thông Tin Của Bạn")
                        navigate(`/information/${res.data.idAccount}`)
                    } else if (resAccount && resAccount.data && resAccount.data.data !== '0') {
                        toast.success(t('login.success'));
                        navigate('/');
                    }
                } else if (role && role.role === 'ROLE_ADMIN') {
                    navigate('/admin')
                }
            } else {
                toast.error(t('login.erraccount'))
                setLoading(false);

            }
        }
    }



    const hanldeKeyDown = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    }

    const { t } = useTranslation();

    return (
        <>
            <Nav style={{ display: 'flex', flexFlow: "row-reverse", marginRight: '30px' }}>
                <Language />
            </Nav>
            <section className="vh-100">
                <div className="container py-5 h-100">

                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}><img src={logo} className="img-fluid" alt="logo" /></NavLink>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
                            <h1 className='text-center'>{t('login.signin')}</h1>

                            <div className="form-outline mb-4">
                                <input type="text"
                                    placeholder={t('login.username')}
                                    className="form-control form-control-lg"
                                    value={userName}
                                    onKeyDown={e => hanldeKeyDown(e)}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4 show-password">
                                <input type={showPassword === true ? 'text' : 'password'}
                                    placeholder={t('login.password')}
                                    className="form-control form-control-lg"
                                    value={password}
                                    onKeyDown={e => hanldeKeyDown(e)}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <i className={showPassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                            <div className='account d-flex'>
                                <div>
                                    {t('login.dontaccount')} <Link to='/signup'>{t('login.register')}</Link>
                                </div>
                                <NavLink to='/forgotpassowd'>{t('login.forgot')}?</NavLink>
                            </div>
                            <div>

                                <button
                                    style={{ width: '100%' }}
                                    onClick={() => handleLogin()}
                                    className='btn btn-primary'
                                    disabled={loading}

                                >
                                    {loading === true && <ImSpinner10 className='loaderIcon' />}
                                    <span>{t('login.dosingin')}</span>
                                </button>
                                <Link to='/' className='my-5' style={{ textDecoration: "none" }}><BiSolidHome className='mb-1' />{t('login.home')}</Link>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Signin;