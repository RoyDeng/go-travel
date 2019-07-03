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
    feed: () =>
        requests.get('/journeys/feed?limit=10&offset=0'),
    get: slug =>
        requests.get(`/journeys/${slug}`),
    update: journey =>
        requests.put(`/journeys/${journey.id}`, { journey: omitId(journey) }),
    create: journey =>
        requests.post('/journeys', { journey })
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
    Journeys,
    Items
};