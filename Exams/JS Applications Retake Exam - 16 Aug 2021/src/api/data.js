import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function getAllGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

async function getRecentGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

async function createGame(data) {
    return api.post('/data/games', data);
}

async function getGameDetails(id) {
    return api.get('/data/games/' + id);
}

async function editGame(id, data) {
    return api.put('/data/games/' + id, data);
}

async function deleteGame(id) {
    return api.del('/data/games/' + id);
}

async function getComments(id) {
    return api.get(`/data/comments?where=gameId%3D%22${id}%22`);
}

async function createComment(data) {
    return api.post('/data/comments', data);
}

export {
    login,
    register,
    logout,
    getAllGames,
    getRecentGames,
    createGame,
    getGameDetails,
    editGame,
    deleteGame,
    getComments,
    createComment
}   