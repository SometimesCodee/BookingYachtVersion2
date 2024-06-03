import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { IoCall } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_swp.png';
const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}><img className='logo' src={logo} alt='logo' /></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/duthuyen" className='nav-link'>Tìm du thuyền</NavLink>
                        <NavLink to="/maybay" className='nav-link'>Tìm vé máy bay</NavLink>
                        <NavLink to="/doanhnhiep" className='nav-link'>Doanh Nghiệp</NavLink>
                        <NavLink to="/blog" className='nav-link'>Blog</NavLink>

                    </Nav>
                    <Nav>
                        <p className='nav-link' style={{ cursor: "pointer" }}><IoCall />Hotline: 0969951736</p>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item><NavLink to='/signin' className='nav-link'>Login</NavLink></NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to='/signup' className='nav-link'>Signup</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;