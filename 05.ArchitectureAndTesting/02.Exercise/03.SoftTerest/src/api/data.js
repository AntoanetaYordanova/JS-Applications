import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllIdeas() {
    const ideas = await api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    if(ideas.length == 0) {
        return undefined;
    }
    return ideas;
}

export async function getIdeaById(id) {
    const url = '/data/ideas/' + id;
    return await api.get(url);
}

export async function createIdea(data) {
    const response = api.post('/data/ideas', data);
    return response;
}

export async function deleteIdea(id) {
    const url = '/data/ideas/' + id;
    api.del(url);
}
