import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

export {
    login,
    register,
    logout
}

export async function getAllCars(){
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}
export async function createCarListing(data){
    return api.post('/data/cars', data);
}

export async function getCarDetails(id){
    return api.get('/data/cars/' + id);
}

export async function editCarListing(id, data){
    return api.put('/data/cars/' + id, data);
}

export async function deleteCarListing(id){
    return api.del('/data/cars/' + id);
}

export async function getUserCarListing(userId){
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getCarsByYear(year){
    return api.get(`/data/cars?where=year%3D${year}`);
}

