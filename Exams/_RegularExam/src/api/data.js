import * as api from './api.js'

const login = api.login;
const register = api.register;
const logout = api.logout;

export {
    login,
    register,
    logout
}

export async function getAllAlbums() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(data) {
    return api.post('/data/albums', data);
}

export async function getAlbumDetails(id) {
    return api.get('/data/albums/' + id);
}

export async function editAlbum(id, data) {
    return api.put('/data/albums/' + id, data);
}

export async function deleteAlbum(id) {
    return api.del('/data/albums/' + id);
}

export async function searchAlbum(song) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${song}%22`);
}