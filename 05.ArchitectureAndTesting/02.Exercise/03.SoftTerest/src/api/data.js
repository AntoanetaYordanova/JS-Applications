import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

async function getAllIdeas() {
    const ideas = await api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    if(ideas.length == 0) {
        return undefined;
    }
    return ideas;
}

async function getIdeaById(id) {
    const url = '/data/ideas/' + id;
    return await api.get(url);
}

async function createIdea(data) {
    const response = api.post('/data/ideas', data);
    return response;
}

function deleteIdea(id) {
    const url = '/data/ideas/' + id;
    api.del(url);
}


window.getAllIdeas = getAllIdeas;
window.getIdeaById = getIdeaById;
window.login = login;
window.createIdea = createIdea;
window.deleteIdea = deleteIdea;
