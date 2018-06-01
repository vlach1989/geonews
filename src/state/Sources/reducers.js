import ActionTypes from '../../constants/ActionTypes';
// import _ from 'lodash';

const INITIAL_STATE = {
    test: 'aaa'
};

function setTest(state, action){
    return {...state, test: action.key};
}

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.TEST:
            return setTest(state, action);
        default:
            return state;
    }
}
