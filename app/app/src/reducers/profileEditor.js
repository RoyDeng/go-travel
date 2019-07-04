import {
    PROFILE_SAVED,
    PROFILE_EDITOR_PAGE_UNLOADED,
    ASYNC_START
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case PROFILE_SAVED:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case PROFILE_EDITOR_PAGE_UNLOADED:
            return {};
        case ASYNC_START:
            return {
                ...state,
                inProgress: true
            };
        default:
            return state;
    }
};