import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import newsReducers from './News/reducers';
import sourcesReducers from './Sources/reducers';

// Redux store
const Store = createStore(combineReducers({
    news: newsReducers,
    sources: sourcesReducers,
}), applyMiddleware(thunk, logger));

export default Store;
