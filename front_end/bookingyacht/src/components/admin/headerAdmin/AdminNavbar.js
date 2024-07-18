import { Nav, NavLink, Navbar } from 'react-bootstrap';
import { AiOutlineLogout } from "react-icons/ai";
import { FaAddressBook, FaHome, FaUsers } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/action/LoginAdminAction';
import './Sidebar.scss';
const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    dispatch(logout());
    navigate('/admin');
  }

  return (
    <div className="d-flex sidebar-open">
      <Navbar bg="dark" variant="dark" className="flex-column sidebar open">
        <Navbar.Brand className="text-center">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/1730974153/display_1500/stock-vector-man-with-the-inscription-admin-icon-outline-man-with-the-inscription-admin-vector-icon-for-web-1730974153.jpg"
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <small>Welcome to Admin</small>
          </div>
        </Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link href="#dashboard" as={Link} to="/dashboard">
            <FaHome /> <span>Dashboard</span>
          </Nav.Link>
          <div className="nav-section">
            <Nav.Link>
              <span>Data</span>
            </Nav.Link>
            <Nav.Link href="#manage-team" as={Link} to="/dashboard/customer">
              <FaUsers /> <span>Customer Manager</span>
            </Nav.Link>
            <Nav.Link href="#contacts-info" as={Link} to="/dashboard/company">
              <FaAddressBook /> <span>Company Manager</span>
            </Nav.Link>
            <NavLink onClick={handleLogout}>
              <AiOutlineLogout/> <span>Logout</span>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
      <div className="content flex-grow-1">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default AdminNavbar;