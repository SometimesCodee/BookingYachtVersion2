import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_swp.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/UserAction';
import { toast } from 'react-toastify';
import Language from './Language';
import { useTranslation } from 'react-i18next';
const Header = () => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const role = useSelector(state => state.account.account.role)


    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(doLogout());
        toast.success('Đăng Xuất Thành Công')
    }

    const { t } = useTranslation();
    return (
        <Navbar expand="lg" className="bg-body-tertiary header">
            <Container>
                <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}><img className='logo' src={logo} alt='logo' /></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <NavLink to="/duthuyen" className='nav-link'>{t('header.find')}</NavLink>
                        <NavLink to="/doanhnhiep" className='nav-link'>{t('header.business')}</NavLink>
                        <NavLink to="/blog" className='nav-link'>Blog</NavLink>

                    </Nav>
                    <Nav className='d-flex' style={{ gap: 50 }}>
                        <NavDropdown title={t('header.setting')} id="basic-nav-dropdown">
                            {
                                isAuthenticated === false

                                    ?

                                    <>
                                        <NavDropdown.Item><NavLink to='/signin' className='nav-link'>{t('header.signin')}</NavLink></NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink to='/signup' className='nav-link'>{t('header.signup')}</NavLink>
                                        </NavDropdown.Item>
                                    </>
                                    :
                                    <>
                                        {
                                            role === 'ROLE_COMPANY'
                                                ?
                                                <>
                                                    <NavDropdown.Item>
                                                        <NavLink to='/manage-company' className='nav-link'>Company Manager</NavLink>
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item>
                                                        <NavLink onClick={handleLogout} className='nav-link'>{t('header.logout')}</NavLink>
                                                    </NavDropdown.Item>
                                                </>
                                                :
                                                <>
                                                    <NavDropdown.Item>
                                                        <NavLink to='/profile' className='nav-link'>{t('header.profile')}</NavLink>
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item>
                                                        <NavLink onClick={handleLogout} className='nav-link'>{t('header.logout')}</NavLink>
                                                    </NavDropdown.Item>
                                                </>
                                        }

                                    </>
                            }

                        </NavDropdown>
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;