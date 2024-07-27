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
            toast.error('Vui Lòng Nhập Đầy Đủ Thông Tin');
            setLoading(false);
        } else {
            let res = await login(userName.trim(), password.trim());
            if (res === undefined) {
                toast.error("Tài Khoản Của Bạn Không Tồn Tại")
            } else if (res && res.data && res.data.data) {
                const role = jwtDecode(res.data.data);
                let resAccount = await getIdCustomer(res.data.idAccount);
                dispatch(doLogin(res.data.data, role.role, res.data.idCompany ? res.data.idCompany : "", res.data.idCustomer ? res.data.idCustomer : ""))
                if (role && role.role === 'ROLE_COMPANY') {
                    setLoading(false);
                    toast.success("Đăng Nhập Thành Công");
                    navigate(`/manage-company`);
                } else if (role && role.role === 'ROLE_CUSTOMER') {
                    setLoading(false);
                    if (resAccount && resAccount.data && resAccount.data.data === '0') {
                        toast.error("Hãy Điền Thông Tin Của Bạn")
                        navigate(`/information/${res.data.idAccount}`)
                    } else if (resAccount && resAccount.data && resAccount.data.data !== '0') {
                        toast.success("Đăng Nhập Thành Công");
                        // navigate(-2);
                    }
                }
            } else {
                toast.error('Tài Khoản Hoặc Mật Khẩu Không Đúng')
                setLoading(false);

            }
        }
    }



    const hanldeKeyDown = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}><img src={logo} className="img-fluid" alt="logo" /></NavLink>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
                            <h1 className='text-center'>Đăng Nhập</h1>

                            <div className="form-outline mb-4">
                                <input type="text"
                                    placeholder='UserName'
                                    className="form-control form-control-lg"
                                    value={userName}
                                    onKeyDown={e => hanldeKeyDown(e)}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4 show-password">
                                <input type={showPassword === true ? 'text' : 'password'}
                                    placeholder='Password'
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
                                    Chưa có tài khoản <Link to='/signup'>Đăng kí</Link>
                                </div>
                                <NavLink to='/forgotpassowd'>Quên mật khẩu?</NavLink>
                            </div>
                            <div>

                                <button
                                    style={{ width: '100%' }}
                                    onClick={() => handleLogin()}
                                    className='btn btn-primary'
                                    disabled={loading}

                                >
                                    {loading === true && <ImSpinner10 className='loaderIcon' />}
                                    <span>Đăng nhập</span>
                                </button>
                                <Link to='/' className='my-5' style={{ textDecoration: "none" }}><BiSolidHome className='mb-1' />Home</Link>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Signin;