import ActionTypes from '../../constants/ActionTypes';

// import _ from 'lodash';

const INITIAL_STATE = {
    data: []
};

function addFeed(state, action){
    return {...state, data: [...state.data, ...[action.data]]};
}

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SOURCE_LOAD_FEED_RECEIVED:
            return addFeed(state, action);
        default:
            return state;
    }
}
