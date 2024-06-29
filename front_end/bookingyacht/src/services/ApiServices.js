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

export const registerCustomer = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('/api/customer/accounts', data)
}

export const getProfileCustomer = (customerId) => {
    return axios.get(`/api/customer/getProfileCustomerById/${customerId}`)
}

export const updateProfileCustomer = (customerId, email, fullName, phoneNumber, address) => {
    const data = new FormData();
    data.append('email', email);
    data.append('fullName', fullName);
    data.append('phoneNumber', phoneNumber);
    data.append('address', address);
    return axios.put(`/api/customer/profile/updateCustomer/${customerId}`, data)
}

export const getAllYachtCompany = () => {
    return axios.get('/api/companies/allYacht');
}
export const getYachtById = (yachtId) => {
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
export const getYachtByIdCompany = (idCompany) =>{
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

// export const getAllRoomType = () => {
//     return axios.get(`/api/companies/roomType/getAllRoomType`);
// }

export const createImageRoom = (image, idRoom) => {
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

export const createRoomType = (price, type, utilities) => {
    const data = new FormData();
    data.append('price', price);
    data.append('type', type);
    data.append('utilities', utilities);
    return axios.post('/api/companies/roomType/addRoomType', data);
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

export const getScheduleYacht = (yachtId) => {
    return axios.get(`/api/companies/getScheduleByYacht/${yachtId}`);
}

export const addFeedback = (idBooking, idCustomer, idYacht, formData) => {
    return axios.post(`http://localhost:8080/api/customer/addFeedback/${idBooking}/${idCustomer}/${idYacht}`, formData);
};

export const getFeedbackByIdYacht = (yachtId) =>{
    return axios.get(`http://localhost:8080/api/customer/getFeedbackByYachtId/${yachtId}`);
}