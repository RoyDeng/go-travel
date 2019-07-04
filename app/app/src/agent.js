import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const encode = encodeURIComponent;
const responseBody = res => res.body;

const API_ROOT = '';

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', { user: { email, password } }),
    register: (username, email, password) =>
        requests.post('/users', { user: { username, email, password } }),
    save: user =>
        requests.put('/user', { user })
};

const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitId = journey => Object.assign({}, journey, { id: undefined })

const Journeys = {
    all: page =>
        requests.get(`/journeys?${limit(10, page)}`),
    byAuthor: (author, page) =>
        requests.get(`/journeys?author=${encode(author)}&${limit(5, page)}`),
    byTag: (tag, page) =>
        requests.get(`/journeys?tag=${encode(tag)}&${limit(10, page)}`),
    del: slug =>
        requests.del(`/journeys/${slug}`),
    favorite: slug =>
        requests.post(`/journeys/${slug}/favorite`),
    favoritedBy: (author, page) =>
        requests.get(`/journeys?favorited=${encode(author)}&${limit(5, page)}`),
    source: () =>
        requests.get('/journeys/source?limit=10&offset=0'),
    get: slug =>
        requests.get(`/journeys/${slug}`),
    unfavorite: slug =>
        requests.del(`/journeys/${slug}/favorite`),
    update: journey =>
        requests.put(`/journeys/${journey.id}`, { journey: omitId(journey) }),
    create: journey =>
        requests.post('/journeys', { journey })
};

const Tags = {
    getAll: () => requests.get('/tags')
};

const Items = {
    create: (id, item) =>
        requests.post(`/journeys/${id}/items`, { item }),
    delete: (id, itemId) =>
        requests.del(`/journeys/${id}/items/${itemId}`),
    forJourney: id =>
        requests.get(`/journeys/${id}/items`)
};

export default {
    Auth,
    Profile,
    Journeys,
    Tags,
    Items,
    setToken: _token => { token = _token; }
};