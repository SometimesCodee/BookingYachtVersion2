import axios from '../utils/CustomizeApi';


export const register = (email, password) => {
    return axios.post('/api/register', { email, password });
}
export const getAllYachtHome = () => {
    return axios.get('/api/customer/allYacht');
}
export const getAvatarYacht = () => {
    return axios.get('/api/customer/file');
}
export const getYachtService = () => {
    return axios.get('/api/customer/getAllService')
}
export const getYachtByYachtId = (id) => {
    return axios.get(`api/customer/findYachtById/${id}`)
}
export const getServiceByYacht = (yachtId) => {
    return axios.get(`api/customer/getServiceByYacht/${yachtId}`)
}
export const getImagesYacht = (yachtId) => {
    return axios.get(`api/customer/yacht/image/${yachtId}`)
}
export const getAllYacht = () => {
    return axios.get('/api/customer/allYacht');
}

export const login = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('/login/signin', data)
}

export const verifyEmail = (email) => {
    const data = new FormData()
    data.append('email', email)
    return axios.post('/api/customer/forgotPassword/verifyEmail', data)
}

export const verifyOTP = (email, otp) => {
    const data = new FormData()
    data.append('otp', otp)
    return axios.post(`/api/customer/forgotPassword/verifyOTP/${email}`, data)
}

export const changePasswordByEmail = (email, password) => {
    const data = new FormData()
    data.append('password', password)
    return axios.post(`/api/customer/forgotPassword/changePasswordByEmail/${email}`, data)
}

export const registerCustomer = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('/api/customer/accounts', data)
}

export const getProfileCustomer = (customerId) => {
    return axios.get(`/api/customer/profile/getProfileCustomerById/${customerId}`)
}

export const updateProfileCustomer = (customerId, email, fullName, phoneNumber, address) => {
    const data = new FormData();
    data.append('email', email);
    data.append('fullName', fullName);
    data.append('phoneNumber', phoneNumber);
    data.append('address', address);
    return axios.put(`/api/customer/profile/updateCustomer/${customerId}`, data)
}

export const getYachtByIdYacht = (yachtId) => {
    return axios.get(`/api/companies/findYachtById/${yachtId}`);
}
export const deleteYacht = (idYacht) => {
    return axios.delete(`/api/companies/yacht/delete/${idYacht}`)
}

export const createYacht = (idCompany, name, image, launch, hullBody, description, rule, itinerary, idYachtType, idLocation) => {
    const data = new FormData()
    data.append('name', name);
    data.append('image', image);
    data.append('launch', launch);
    data.append('hullBody', hullBody);
    data.append('description', description);
    data.append('rule', rule);
    data.append('itinerary', itinerary);
    data.append('idYachtType', idYachtType);
    data.append('idLocation', idLocation);
    return axios.post(`/api/companies/yacht/insertYacht/${idCompany}`, data);
}


export const getRoomById = (roomId) => {
    return axios.get(`/api/customer/getRoomById/${roomId}`)
}
export const fillInformationCustomer = (idCustomer, fullName, email, phoneNumber, address) => {
    const data = new FormData()
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('address', address);

    return axios.post(`/api/customer/profile/${idCustomer}`, data);
}

export const fillInformationCompany = (idCompany, name, address, logo, email) => {
    const data = new FormData()
    data.append('name', name);
    data.append('email', email);
    data.append('logo', logo);
    data.append('address', address);

    return axios.put(`/api/customer/profile/${idCompany}`, data);
}

export const getAllLocation = () => {
    return axios.get('/api/companies/getAllLocation');
}

export const createYachtImage = (idYacht, image) => {
    const data = new FormData();
    data.append('image', image);
    return axios.post(`/api/companies/yacht/addImage/${idYacht}`, data);
}

export const getYachtImage = (idYacht) => {
    return axios.get(`/api/companies/yacht/image/${idYacht}`);
}

export const deleteYachtImage = (idImage) => {
    return axios.delete(`/api/companies/yacht/deleteImage/${idImage}`);
}

export const updateYachtImage = (idImage, image) => {
    const data = new FormData();
    data.append('image', image)
    return axios.put(`/api/companies/yacht/updateImage/${idImage}`, data);
}

export const getFeedbackCompany = (idCompany) => {
    return axios.get(`/api/companies/feedBackByIdCompany/${idCompany}`)
}
export const getYachtByIdCompany = (idCompany) => {
    return axios.get(`/api/customer/yacht/findByCompany/${idCompany}`)
}

export const getYachtType = () => {
    return axios.get('/api/companies/getYachtType')
}

export const getScheduleByYacht = (yachtId) => {
    return axios.get(`/api/customer/getScheduleByYacht/${yachtId}`)
}

export const getUnbookedRoomsByYachtAndSchedule = (yachtId, scheduleId) => {
    return axios.get(`/api/customer/getUnbookedRoomsByYachtAndSchedule/${yachtId}/${scheduleId}`)
}

export const getAddingServiceByYacht = (yachtId) => {
    return axios.get(`/api/customer/getAddingServiceByYacht/${yachtId}`)
}

export const getAllRoomType = (yachtId) => {
    return axios.get(`/api/customer/roomType/getAllRoomType/${yachtId}`)
}

export const getAllRoomImages = (roomId) => {
    return axios.get(`/api/customer/roomImage/getAllImageByIdRoom/${roomId}`)
}
export const updateYacht = (idYacht, name, image, hullBody, description, rule, itinerary, idYachtType, idLocation) => {
    const data = new FormData();
    data.append('name', name);
    data.append('image', image);
    data.append('hullBody', hullBody);
    data.append('description', description);
    data.append('rule', rule);
    data.append('itinerary', itinerary);
    data.append('idYachtType', idYachtType);
    data.append('idLocation', idLocation);
    return axios.put(`/api/companies/yacht/updateYacht/${idYacht}`, data)
}
export const getAllRoomByYacht = (idYacht) => {
    return axios.get(`/api/companies/getRoomByYacht/${idYacht}`);
}

export const getAllRoomTypeCompany = (yachtId) => {
    return axios.get(`/api/companies/roomType/getAllRoomType/${yachtId}`);
}

export const createImageRoom = (idRoom, image) => {
    const data = new FormData();
    data.append('image', image);
    return axios.post(`/api/companies/roomImage/insertImage/${idRoom}`, data);
}

// export const getAllServices = () => {
//     return axios.get(`/api/companies/getAllService`);
// }

export const getServicesByYacht = (idYacht) => {
    return axios.get(`/api/companies/getServiceByYacht/${idYacht}`);
}

export const createServiceYacht = (idYacht, service, price) => {
    const data = new FormData();
    data.append('service', service);
    data.append('price', price);
    return axios.post(`/api/companies/addServiceForYacht/${idYacht}`, data)
}

export const upadteServiceYacht = (idYacht, idService, service, price) => {
    const data = new FormData();
    data.append('service', service);
    data.append('price', price);
    return axios.put(`/api/companies/updateYachtService/${idYacht}/${idService}`, data)
}

export const deleteServiceYacht = (idYacht, idService) => {
    return axios.delete(`/api/companies/deleteYachtService/${idYacht}/${idService}`);
}

export const createRoom = (roomName, area, description, roomType, avatar, idYacht) => {
    const data = new FormData();
    data.append('roomName', roomName)
    data.append('area', area)
    data.append('description', description)
    data.append('idRoomType', roomType)
    data.append('avatar', avatar)
    return axios.post(`/api/companies/room/addRoom/${idYacht}`, data);
}

export const updateRoom = (roomId, roomName, description, avatar) => {
    const data = new FormData();
    data.append('roomName', roomName);
    data.append('description', description);
    data.append('avatar', avatar);

    return axios.put(`/api/companies/room/updateRoom/${roomId}`, data)
}

export const createRoomType = (price, type, utilities, yachtId) => {
    const data = new FormData();
    data.append('price', price);
    data.append('type', type);
    data.append('utilities', utilities);
    return axios.post(`/api/companies/roomType/addRoomType/${yachtId}`, data);
}

export const updateRoomType = (roomTypeId, price, type, utilities) => {
    const data = new FormData();
    data.append('price', price);
    data.append('type', type);
    data.append('utilities', utilities);
    return axios.put(`/api/companies/roomType/updateRoomType/${roomTypeId}`, data);
}

export const deleteRoomType = (roomTypeId) => {
    return axios.delete(`/api/companies/roomType/deleteRoomType/${roomTypeId}`);
}

export const getImageByRoom = (roomId) => {
    return axios.get(`/api/companies/roomImage/getAllImageByIdRoom/${roomId}`)
}

export const updateImageRoom = (idImage, image) => {
    const data = new FormData();
    data.append('image', image);
    return axios.put(`/api/companies/roomImage/updateImage/${idImage}`, data)
}


export const getScheduleYacht = (yachtId) => {
    return axios.get(`/api/companies/getScheduleByYacht/${yachtId}`);
}

export const deleteImageRoom = (idImage) => {
    return axios.delete(`/api/companies/roomImage/deleteImage/${idImage}`);
}

export const getProfileCompany = (idCompany) => {
    return axios.get(`/api/companies/profiles/${idCompany}`);
}

export const updateProfileCompany = (idCompany, name, address, logo) => {
    const data = new FormData();
    data.append('name', name)
    data.append('address', address)
    data.append('logo', logo)
    return axios.put(`/api/companies/profile/${idCompany}`, data)
}

export const getBookingOrder = (idCompany) => {
    return axios.get(`/api/companies/bookingOrders/${idCompany}`);
}

export const confirmBooking = (idCompany, idBookingOrder) => {
    return axios.put(`/api/companies/${idCompany}/confirm/${idBookingOrder}`)
}

export const canelBooking = (idCompany, idBookingOrder) => {
    return axios.put(`/api/companies/${idCompany}/cancel/${idBookingOrder}`)
}

export const getBookingByAmount = (idCompany, min, max) => {
    return axios.get(`/api/companies/bookingOrders/range/${idCompany}`, {
        params: {
            min: min,
            max: max
        }
    })
}


export const createScheduleYacht = (yachtId, startDate, endDate) => {
    const data = new FormData();
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    return axios.post(`/api/companies/addSchedule/${yachtId}`, data)
}

export const updateScheduleYacht = (yachtId, scheduleId, startDate, endDate) => {
    const data = new FormData();
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    return axios.put(`/api/companies/updateSchedule/${yachtId}/${scheduleId}`, data)
}

export const deleteScheduleYacht = (yachtId, scheduleId) => {
    return axios.delete(`/api/companies/deleteSchedule/${yachtId}/${scheduleId}`)
}
export const getCustomerById = (customerId) => {
    return axios.get(`/api/customer/profile/getProfileCustomerById/${customerId}`);
}

export const createPayment = (selectedRoomIds, selectedServiceIds, requirement, idCustomer, idSchedule) => {
    let params = new URLSearchParams();
    let selectedRoomIdsString = selectedRoomIds.join(',');
    let selectedServiceIdsString = selectedServiceIds.join(',');
    params.append('selectedRoomIds', selectedRoomIdsString);
    params.append('selectedServiceIds', selectedServiceIdsString);
    params.append('requirement', requirement);
    params.append('idCustomer', idCustomer);
    params.append('idSchedule', idSchedule);
    return axios.post(`/api/customer/payment?${params.toString()}`);
};

export const viewBillByIdCustomer = (idCustomer) => {
    return axios.get(`/api/customer/bills/${idCustomer}`)
}
export const getFeedbackByIdYacht = (yachtId) => {
    return axios.get(`/api/customer/getFeedbackByYachtId/${yachtId}`);
}
export const addFeedback = (idBooking, idCustomer, formData) => {
    return axios.post(`/api/customer/addFeedback/${idBooking}/${idCustomer}`, formData);
};
export const existsFeedback = (idBooking) => {
    return axios.get(`/api/customer/existsFeedback/${idBooking}`);
}
export const getAllRoomByYachtCustomer = (idYacht) => {
    return axios.get(`/api/customer/getRoomByYacht/${idYacht}`);
}

export const getAllYachtType = () => {
    return axios.get(`/api/customer/getYachtType`);
}

export const getAllYachtServiceId = () => {
    return axios.get(`/api/customer/getAllYachtService`);
}

export const getAllLocationCustomer = () => {
    return axios.get(`/api/customer/getAllLocation`);
}

export const getScheduleById = (idSchedule) => {
    return axios.get(`/api/customer/getScheduleById/${idSchedule}`);
}
export const getAllFeedback = () => {
    return axios.get('/api/customer/getAllFeedback');
}
export const getAllCompany = () => {
    return axios.get('/api/customer/getAllCompany');
}

export const getAllCustomerInfor = () => {
    return axios.get(`/api/customer/getAllCustomer`);
}

export const getBookingOrderByCustomer = (idCustomer) => {
    return axios.get(`/api/customer/bookingOrders/${idCustomer}`)
}

export const cancelBookingByCustomer = (idCustomer, idBooking, reason) => {
    const data = new FormData();
    data.append('reason', reason)
    return axios.put(`/api/customer/bookingOrders/${idCustomer}/cancel/${idBooking}`, data)
}

export const getDetailBookingByCustomer = (idCustomer, idBooking) => {
    return axios.get(`/api/customer/bookingOrders/${idCustomer}/${idBooking}`)
}

export const getHighestAndLowestPriceByYacht = (idYacht) => {
    return axios.get(`/api/customer/yacht/getPriceRoom/${idYacht}`)
}

export const changePasswordCompany = (idCompany, oldPassword, newPassword, confirmPassword) => {
    const data = new FormData()
    data.append('oldPassword', oldPassword)
    data.append('newPassword', newPassword)
    data.append('confirmPassword', confirmPassword)
    return axios.put(`/api/companies/profiles/changePassword/${idCompany}`, data)
}
export const changePasswordCustomer = (idCustomer, oldPassword, newPassword, confirmPassword) => {
    const data = new FormData()
    data.append('oldPassword', oldPassword)
    data.append('newPassword', newPassword)
    data.append('confirmPassword', confirmPassword)
    return axios.put(`/api/customer/profiles/changePassword/${idCustomer}`, data)
}


