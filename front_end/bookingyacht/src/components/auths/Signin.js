import logo from '../../assets/logo_swp.png';
import { FcGoogle } from "react-icons/fc";
import './Auth.scss'
import { useState } from 'react';
import { login, loginCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner10 } from "react-icons/im";
import { doLogin } from '../../redux/action/UserAction';
import { useDispatch } from 'react-redux';
// import { Rlogin } from '../../redux/action/CustomerAction';
import { jwtDecode } from "jwt-decode";
const Signin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const navigate = useNavigate();
    const handleLogin = async () => {
        let res = await loginCustomer(userName, password);
        console.log(res);
        if (userName === '' || password === '') {
            toast.error('Invalid');
            setLoading(false);
        } else if (res && res.data.status === 200 && res.data.success === true) {
            dispatch(doLogin(res));
            const role = jwtDecode(res.data.data);
            if (role && role.role === 'ROLE_COMPANY') {
                toast.success("Login Successful");
                setLoading(false);
                navigate('/manage-company');
            } else {
                toast.success("Login Successful");
                setLoading(false);
                navigate('/');
            }

        } else {
            toast.error('username invalid')
            setLoading(false);

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
                            <h1 className='text-center'>Sign in</h1>

                            <div className="form-outline mb-4">
                                <input type="text"
                                    placeholder='UserName'
                                    className="form-control form-control-lg"
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4 show-password">
                                <input type={showPassword === true ? 'text' : 'password'}
                                    placeholder='Password'
                                    className="form-control form-control-lg"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <i className={showPassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                            <div className='account d-flex'>
                                <div>
                                    Don't have an account <Link to='/signup'>Signup</Link>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>
                            <button
                                style={{ width: '100%' }}
                                onClick={() => handleLogin()}
                                className='btn btn-primary'
                                disabled={loading}
                            >
                                {loading === true && <ImSpinner10 className='loaderIcon' />}
                                <span>Sign in</span>

                            </button>
                            <div className="divider  d-flex align-items-center my-4">
                                <p style={{ width: '100%' }} className=" text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#3b5998' }} href="#!" role="button">
                                <FcGoogle /> Continue with Google
                            </a>

                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Signin;