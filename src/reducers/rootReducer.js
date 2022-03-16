import { combineReducers } from 'redux';

import timeReducer from './timeReducer';

const appReducer = combineReducers({
    time: timeReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
