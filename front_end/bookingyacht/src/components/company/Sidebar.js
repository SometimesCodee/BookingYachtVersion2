import 'react-pro-sidebar/dist/css/styles.css';
import { FaShip } from "react-icons/fa6";
// import { AiFillSchedule } from "react-icons/ai";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { TbBrandBooking } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import React from 'react';
import sidebarBg from '../../assets/sidebar.jpg';
import { Link, NavLink } from 'react-router-dom';
// import logo from '../../assets/logo_swp.png'
const Sidebar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;

    return (
        <div>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {/* <DiReact size={'3em'} color={'00bfff'} /> */}

                        <span>Company Yacht Cruise</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<TbBrandBooking />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            Customer Booking
                            <Link to='/manage-company' />
                        </MenuItem>

                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaShip />}
                        > View Yacht
                            <Link to='/manage-company/view-yacht' />
                        </MenuItem>
                    </Menu>

                    <Menu iconShape="circle">

                        <MenuItem
                            icon={<MdPeopleAlt />}
                        > View Owner
                            <Link to='/manage-company/view-owner' />
                        </MenuItem>
                    </Menu>

                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaStar />}
                        >
                            View Feedback
                            <Link to='/manage-company/view-feedback' />
                        </MenuItem>

                    </Menu>

                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaMoneyCheckAlt />}
                        >
                            Bill
                            <Link to='/manage-company/bill' />
                        </MenuItem>

                    </Menu>


                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <NavLink className='nav-link' to='/signin'><TbLogout2 />Back</NavLink>
                        {/* <FaGithub /> */}
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>

                        </span>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;