import {
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    JOURNEY_SUBMITTED,
    ASYNC_START,
    ADD_TAG,
    REMOVE_TAG,
    UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case EDITOR_PAGE_LOADED:
            return {
                ...state,
                id: action.payload ? action.payload.journey.id : '',
                title: action.payload ? action.payload.journey.title : '',
                description: action.payload ? action.payload.journey.description : '',
                tagInput: '',
                tagList: action.payload ? action.payload.journey.tagList : []
            };
        case EDITOR_PAGE_UNLOADED:
            return {};
        case JOURNEY_SUBMITTED:
            return {
                ...state,
                inProgress: null,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            if (action.subtype === JOURNEY_SUBMITTED) {
                return { ...state, inProgress: true };
            }
            break;
        case ADD_TAG:
            return {
                ...state,
                tagList: state.tagList.concat([state.tagInput]),
                tagInput: ''
            };
        case REMOVE_TAG:
            return {
                ...state,
                tagList: state.tagList.filter(tag => tag !== action.tag)
            };
        case UPDATE_FIELD_EDITOR:
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }

    return state;
};