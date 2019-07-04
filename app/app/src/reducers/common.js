import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    JOURNEY_SUBMITTED,
    PROFILE_SAVED,
    LOGIN,
    REGISTER,
    DELETE_JOURNEY,
    JOURNEY_PAGE_UNLOADED,
    EDITOR_PAGE_UNLOADED,
    HOME_PAGE_UNLOADED,
    PROFILE_PAGE_UNLOADED,
    FAVORITE_JOURNEYS_PAGE_UNLOADED,
    PROFILE_EDITOR_PAGE_UNLOADED,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const defaultState = {
    appName: '趣旅行',
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case JOURNEY_SUBMITTED:
            const redirectUrl = `/journey/${action.payload.journey.id}`;
            return { ...state, redirectTo: redirectUrl };
        case PROFILE_SAVED:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            };
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            };
        case DELETE_JOURNEY:
            return { ...state, redirectTo: '/' };
        case JOURNEY_PAGE_UNLOADED:
        case EDITOR_PAGE_UNLOADED:
        case HOME_PAGE_UNLOADED:
        case PROFILE_PAGE_UNLOADED:
        case FAVORITE_JOURNEYS_PAGE_UNLOADED:
        case PROFILE_EDITOR_PAGE_UNLOADED:
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
        default:
            return state;
    }
};