import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
const AdminLayout = () => (
  <div style={{ display: 'flex' }}>
    <AdminNavbar />
    {/* <MainNavbar/> */}
    <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
