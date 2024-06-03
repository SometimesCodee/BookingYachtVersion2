import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FaAddressBook, FaBars, FaCalendarAlt, FaChartBar, FaChartLine, FaChartPie, FaFileInvoiceDollar, FaHome, FaQuestionCircle, FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
// const AdminNavbar = () => (
//   <Navbar bg="dark" variant="dark" className="flex-column p-3" style={{ height: '100vh', width: '250px' }}>
//     <Navbar.Brand as={Link} to="/admin">
//       Admin Panel
//     </Navbar.Brand>
//     <Navbar.Brand as={Link} to="/">
//       <img
//         alt=""
//         src="/logo.svg"
//         width="30"
//         height="30"
//         className="d-inline-block align-top"
//       />{' '}
//     </Navbar.Brand>
//     <Nav className="flex-column">
//       <Nav.Link as={Link} to="/admin">Admin Home</Nav.Link>
//       <Nav.Link as={Link} to="/admin/manager">Page 1</Nav.Link>
//       <Nav.Link as={Link} to="/admin/page2">Page 2</Nav.Link>
//     </Nav>
//   </Navbar>
// );

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`d-flex ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Navbar bg="dark" variant="dark" className={`flex-column sidebar ${isOpen ? 'open' : 'closed'}`}>
        <Navbar.Brand className="text-center">
          {isOpen && (
            <>
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-info">
                <h5>Ed Roh</h5>
                <small>VP Fancy Admin</small>
              </div>
            </>
          )}
        </Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link href="#dashboard" as={Link} to="/admin/manager">
            <FaHome /> {isOpen && <span>Dashboard</span>}
          </Nav.Link>
          <div className="nav-section">
            <Nav.Link>
              {isOpen && <span>Data</span>}
            </Nav.Link>
            {/* <span className="section-title">Data</span> */}
            <Nav.Link href="#manage-team">
              <FaUsers /> {isOpen && <span>Manage Customer</span>}
            </Nav.Link>
            <Nav.Link href="#contacts-info">
              <FaAddressBook /> {isOpen && <span>Contacts Information</span>}
            </Nav.Link>
            <Nav.Link href="#invoices-balances">
              <FaFileInvoiceDollar /> {isOpen && <span>Invoices Balances</span>}
            </Nav.Link>
          </div>
          <div className="nav-section">
            <Nav.Link>
              {isOpen && <span>Pages</span>}
            </Nav.Link>
            {/* <span className="section-title">{isOpen && 'Pages'}</span> */}
            <Nav.Link href="#profile-form">
              <FaUser /> {isOpen && <span>Profile Form</span>}
            </Nav.Link>
            <Nav.Link href="#calendar">
              <FaCalendarAlt /> {isOpen && <span>Calendar</span>}
            </Nav.Link>
            <Nav.Link href="#faq-page">
              <FaQuestionCircle /> {isOpen && <span>FAQ Page</span>}
            </Nav.Link>
          </div>
          <div className="nav-section">
            <Nav.Link>
            {isOpen && <span>Charts</span>}
            </Nav.Link>
            {/* <span className="section-title">{isOpen && 'Charts'}</span> */}
            <Nav.Link href="#charts-bar">
              <FaChartBar /> {isOpen && <span>Bar Chart</span>}
            </Nav.Link>
            <Nav.Link href="#charts-pie">
              <FaChartPie /> {isOpen && <span>Pie Chart</span>}
            </Nav.Link>
            <Nav.Link href="#charts-line">
              <FaChartLine /> {isOpen && <span>Line Chart</span>}
            </Nav.Link>
          </div>
        </Nav>
      </Navbar>
      <div className="content flex-grow-1">
        <button className="btn toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default AdminNavbar;
