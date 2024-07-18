import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
} from "../type/Type.js";



const initialState = {
    loading: false,
    token: localStorage.getItem('token') || null,
    role : localStorage.getItem('role') || null,
    error: null,
}

const LoginAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                role : action.payload.role
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('token'); 
            localStorage.removeItem('role');
            return {
                ...state,
                loading: false,
                token: null,
                role : null,
                error: null,
            };
        default:
            return state;
    }
};
export default LoginAdminReducer;