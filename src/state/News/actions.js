import _ from 'lodash';
import ActionTypes from '../../constants/ActionTypes';

// ============ creators ===========
const add = (data) => {
    return (dispatch) => {
        if(!_.isArray(data)) data = [data];
        dispatch(actionAdd(data));
    };
};

// ============ actions ===========
function actionAdd(data){
    return {
        type: ActionTypes.NEWS.ADD,
        data: data
    }
}


export default {
    add
}