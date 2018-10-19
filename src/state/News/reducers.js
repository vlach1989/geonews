import ActionTypes from '../../constants/ActionTypes';

const INITIAL_STATE = {
    byKey: null
};

const add = (state, action) => {
    let newData = {};
    action.data.map(newsItem => {
        newData[newsItem.key] = newsItem;
        return newsItem;
    });
    return {...state, byKey: {...state.byKey, ...newData}};
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.NEWS_ADD:
            return add(state, action);
        default:
            return state;
    }
}
