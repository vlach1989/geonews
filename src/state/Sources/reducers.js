import ActionTypes from '../../constants/ActionTypes';

const INITIAL_STATE = {
    byKey: null
};

const add = (state, action) => {
    let newData = {};
    action.sources.map(source => {
        newData[source.key] = source;
        return source;
    });
    return {...state, byKey: {...state.byKey, ...newData}};
};

const loadingError = (state, action) => {
    return {...state, byKey: {
            ...state.byKey,
            [action.key]: {
                ...state.byKey[action.key],
                loadingStatus: "error"
            }
        }
    }
};

const loadingStarted = (state, action) => {
    return {...state, byKey: {
        ...state.byKey,
            [action.key]: {
                ...state.byKey[action.key],
                loadingStatus: "started"
            }
        }
    }
};

const loadingSuccess = (state, action) => {
    return {...state, byKey: {
            ...state.byKey,
            [action.key]: {
                ...state.byKey[action.key],
                loadingStatus: "success"
            }
        }
    }
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SOURCES.ADD:
            return add(state, action);
        case ActionTypes.SOURCES.LOAD_FEED.ERROR:
            return loadingError(state, action);
        case ActionTypes.SOURCES.LOAD_FEED.RECEIVED:
            return loadingSuccess(state, action);
        case ActionTypes.SOURCES.LOAD_FEED.REQUEST:
            return loadingStarted(state, action);
        default:
            return state;
    }
}
