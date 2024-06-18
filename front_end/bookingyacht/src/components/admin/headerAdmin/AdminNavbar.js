import { Nav, NavLink, Navbar } from 'react-bootstrap';
import { AiOutlineLogout } from "react-icons/ai";
import { FaAddressBook, FaHome, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const AdminNavbar = () => {
  return (
    <div className="d-flex sidebar-open">
      <Navbar bg="dark" variant="dark" className="flex-column sidebar open">
        <Navbar.Brand className="text-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <h5>Ed Roh</h5>
            <small>VP Fancy Admin</small>
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
            <NavLink>
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