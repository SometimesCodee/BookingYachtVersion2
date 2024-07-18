import axios from "axios";
import { GET_ALL_COMPANIES, GET_ALL_CUSTOMERS } from "../type/Type";

const getAuthHeader = () =>{
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
}

export const fetchCustomers = () => async dispatch =>{
    try{
        const config = {
            method : 'get',
            url : 'http://localhost:8080/api/admins/getAllCustomer',
            headers : {
                'Authorization' : getAuthHeader()
            }
        }
        const response = await axios(config);
        const data = response.data.data;

        const filterData = data.filter(customer => customer.accountDTO.status === 1);
        dispatch({
            type : GET_ALL_CUSTOMERS,
            payload : filterData
        });

    }catch(error){
        console.error('Error fetching customers:', error);
    }
}

export const  fetchCompanies = () => async dispatch => {
    try{
       const config = {
        method : 'get',
        url : 'http://localhost:8080/api/admins/getAllCompany',
        headers : {
            'Authorization' : getAuthHeader()
        }
       }
        const response = await axios(config);
        const data = response.data.data;

        dispatch({
            type : GET_ALL_COMPANIES,
            payload : data
        })
    }catch(error){
        console.error('Error fetching companies:', error);
    }
}
