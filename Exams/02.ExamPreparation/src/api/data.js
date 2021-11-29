import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function addBook(data) {
    return api.post('/data/books', data);
}

async function getAllBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

async function getBookDetails(id) {
    return api.get('/data/books/' + id);
}

async function editBook(id, data) {
    return api.put('/data/books/' + id, data);
}

async function deleteBook(id) {
    return api.del('/data/books/' + id);
}

async function getUserBooks(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

async function getTotalLikes(id) {
    return api.get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

async function isBookLikedByUser(userId, bookId) {
    const result = await api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    
    return result == 0 ? false : true;
}

async function sendLike(bookId) {
    return api.post('/data/likes', {bookId});
}
export {
    login,
    register,
    logout,
    addBook,
    getAllBooks,
    getBookDetails,
    editBook,
    deleteBook,
    getUserBooks,
    getTotalLikes,
    isBookLikedByUser,
    sendLike
}