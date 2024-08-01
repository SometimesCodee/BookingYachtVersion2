import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AiOutlineGlobal } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
const Language = () => {
    const { t, i18n } = useTranslation();


    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        console.log(i18n.language)
    }

    return (
        <div className='d-flex'>
            <AiOutlineGlobal size={18} style={{ color: 'black', position: 'relative', top: 11, right: -4 }} />

            <NavDropdown title={i18n.language === 'vi' ? "Tiếng Việt" : "English"} id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <NavLink onClick={() => handleChangeLanguage('vi')} className='nav-link'>Tiếng Việt</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavLink onClick={() => handleChangeLanguage('en')} className='nav-link'>English</NavLink>
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    );
};

export default Language;