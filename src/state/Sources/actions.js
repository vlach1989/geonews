import ActionTypes from '../../constants/ActionTypes';

// import _ from 'lodash';

// ============ creators ===========
function test(key) {
    return dispatch => {
        dispatch(actionTest(key));
    };
}

// ============ actions ===========

function actionTest(key) {
    return {
        type: ActionTypes.TEST,
        key: key
    }
}

// ============ export ===========

export default {
    test: test
}

