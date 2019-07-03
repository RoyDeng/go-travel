import {
    JOURNEY_PAGE_LOADED,
    JOURNEY_PAGE_UNLOADED,
    ADD_ITEM,
    DELETE_ITEM
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case JOURNEY_PAGE_LOADED:
            return {
                ...state,
                journey: action.payload[0].journey,
                items: action.payload[1].items
            };
        case JOURNEY_PAGE_UNLOADED:
            return {};
        case ADD_ITEM:
            return {
                ...state,
                commentErrors: action.error ? action.payload.errors : null,
                items: action.error ?
                    null :
                    (state.items || []).concat([action.payload.item])
            };
        case DELETE_ITEM:
            const itemId = action.itemId
            return {
                ...state,
                items: state.items.filter(item => item.id !== itemId)
            };
        default:
            return state;
    }
};