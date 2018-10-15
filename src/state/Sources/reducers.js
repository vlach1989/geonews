import ActionTypes from '../../constants/ActionTypes';

// import _ from 'lodash';

const INITIAL_STATE = {
    byKey: null
};

const addFeed = (state, action) => {
    let newData = {...state.byKey, [action.data.key]: action.data};
    return {...state, byKey: newData}
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SOURCE_LOAD_FEED_RECEIVED:
            return addFeed(state, action);
        default:
            return state;
    }
}
