import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedHomepage = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const role = useSelector(state => state.account.account.role);

    if (role !== 'ROLE_CUSTOMER') {
        return <Navigate to='/manage-company'></Navigate>
    }


    return (

        <>
            {props.children}
        </>
    );
};

export default ProtectedHomepage;