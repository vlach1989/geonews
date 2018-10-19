import ActionTypes from '../../constants/ActionTypes';

const INITIAL_STATE = {
    byKey: null
};

const addSources = (state, action) => {
    let newData = {};
    action.sources.map(source => {
        newData[source.key] = source;
        return source;
    });
    return {...state, byKey: {...state.byKey, ...newData}};
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SOURCES_ADD:
            return addSources(state, action);
        default:
            return state;
    }
}
