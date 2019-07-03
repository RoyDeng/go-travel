import {
    SET_PAGE,
    APPLY_TAG_FILTER,
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    CHANGE_TAB,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
    PROFILE_FAVORITES_PAGE_LOADED,
    PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                journeys: action.payload.journeys,
                journeysCount: action.payload.journeysCount,
                currentPage: action.page
            };
        case APPLY_TAG_FILTER:
            return {
                ...state,
                pager: action.pager,
                journeys: action.payload.journeys,
                journeysCount: action.payload.journeysCount,
                tab: null,
                tag: action.tag,
                currentPage: 0
            };
        case HOME_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                tags: action.payload[0].tags,
                journeys: action.payload[1].journeys,
                journeysCount: action.payload[1].journeysCount,
                currentPage: 0,
                tab: action.tab
            };
        case HOME_PAGE_UNLOADED:
            return {};
        case CHANGE_TAB:
            return {
                ...state,
                pager: action.pager,
                journeys: action.payload.journeys,
                journeysCount: action.payload.journeysCount,
                tab: action.tab,
                currentPage: 0,
                tag: null
            };
        case PROFILE_PAGE_LOADED:
        case PROFILE_FAVORITES_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                journeys: action.payload[1].journeys,
                journeysCount: action.payload[1].journeysCount,
                currentPage: 0
            };
        case PROFILE_PAGE_UNLOADED:
        case PROFILE_FAVORITES_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};