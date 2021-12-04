import { getUserData } from '../util.js';
import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

export {
    login,
    register,
    logout
}

export async function createMeme(data) {
    return await api.post('/data/memes', data);
}

export async function getAllMemes() {
    return await api.get('/data/memes?sortBy=_createdOn%20desc');
}

export async function getMemeDetails(id) {
    return await api.get('/data/memes/' + id);
}

export async function editMeme(id, data) {
    return await api.put('/data/memes/' + id, data);
}

export async function deleteMeme(id) {
    return await api.del('/data/memes/' + id);
}

export async function getUserMemes() {
    const userData = getUserData();
    return await api.get(`/data/memes?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`);
}