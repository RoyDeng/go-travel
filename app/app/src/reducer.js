import journey from './reducers/journey';
import journeyList from './reducers/journeyList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import profileEditor from './reducers/profileEditor';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    journey,
    journeyList,
    auth,
    common,
    editor,
    home,
    profile,
    profileEditor,
    router: routerReducer
});