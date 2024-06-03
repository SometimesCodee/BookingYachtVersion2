// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
// import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Home from './Home';
// ;

// function Admin() {
//     return (
//         <Router>
//       <div style={{ display: 'flex' }}>
//         <Navbar bg="dark" variant="dark" className="flex-column p-3" style={{ height: '100vh', width: '250px' }}>
//           <Navbar.Brand href="#home">
//             <img
//               alt=""
//               src="/logo.svg"
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//             />{' '}
//             My App
//           </Navbar.Brand>
//           <Nav className="flex-column">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <NavDropdown title="Company" id="basic-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/company/info">Company Info</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/company/team">Our Team</NavDropdown.Item>
//             </NavDropdown>
//             <NavDropdown title="Customer" id="basic-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/customer/list">Customer List</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/customer/support">Customer Support</NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link as={Link} to="/history">History Booking</Nav.Link>
//           </Nav>
//         </Navbar>
//         <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* <Route path="/company/info" element={<Company />} />
//             <Route path="/company/team" element={<Company />} />
//             <Route path="/customer/list" element={<Customer />} />
//             <Route path="/customer/support" element={<Customer />} />
//             <Route path="/history" element={<HistoryBooking />} /> */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//     );
// }


// export default Admin;