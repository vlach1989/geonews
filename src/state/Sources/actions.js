import ActionTypes from '../../constants/ActionTypes';
import RssParser from 'rss-parser';

import config from '../../config';

// import _ from 'lodash';

// ============ creators ===========
function load() {
    return dispatch => {
        dispatch(loadRssChannels());
    };
}

function loadRssChannels() {
    return dispatch => {
        let parser = new RssParser();
        config.rssChannels.map(channel => {
            let promise = parser.parseURL(channel.url);
            return promise.then(((sourceData, result) => {
                // todo pass to store even sourceData
                // todo parse results before fire add action
                dispatch(actionAddFeed(result));
            }).bind(null, channel));
        });
    };
}

// ============ actions ===========

function actionAddFeed(data) {
    return {
        type: ActionTypes.TEST,
        data: data
    }
}

// ============ export ===========

export default {
    load: load
}

