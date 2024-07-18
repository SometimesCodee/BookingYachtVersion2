import { useEffect, useState } from 'react';
import { BiSolidHome } from "react-icons/bi";
import { ImSpinner10 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo_swp.png';
import { login } from '../../../redux/action/LoginAdminAction';
import './Auth.scss';
const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, role } = useSelector((state) => state.loginAdmin);

    useEffect(() => {
        if (role === 'ROLE_ADMIN') {
            navigate('/dashboard');
        }
    }, [role, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email.trim(), password.trim()));
    };

    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <Link to='/' className='navbar-brand' style={{ width: '150px' }}>
                                <img src={logo} className="img-fluid" alt="logo" />
                            </Link>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
                            <h1 className='text-center'>Đăng Nhập</h1>
                            <form onSubmit={handleLogin}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        placeholder='Tên đăng nhập'
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-4 show-password">
                                    <input
                                        type= 'password'
                                        placeholder='Mật khẩu'
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                <button
                                    style={{ width: '100%' }}
                                    type="submit"
                                    className='btn btn-primary'
                                    disabled={loading}
                                >
                                    {loading && <ImSpinner10 className='loaderIcon' />}
                                    <span>Đăng nhập</span>
                                </button>
                                <Link to='/' className='my-5' style={{ textDecoration: "none" }}>
                                    <BiSolidHome className='mb-1' />Trang chủ
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginAdmin;
