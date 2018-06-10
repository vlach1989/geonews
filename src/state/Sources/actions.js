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

function loadFeedError(channel, error){
    return dispatch => {
        console.warn('@@@ Sources/actions#loadRssChannel Error occurred while loading channel:', channel.name);
        console.warn('@@@ Sources/actions#loadRssChannel Error:', error);
        dispatch(actionLoadFeedError(error));
    };
}

function loadFeedReceived(channel, result){
    return dispatch => {
        console.log('@@@ Sources/actions#loadRssChannel Result received for channel:', channel.name);
        let data = {...channel, ...result};
        dispatch(actionLoadFeedReceived(data));
    };
}

function loadFeedRequest(channel){
    return dispatch => {
        console.log('@@@ Sources/actions#loadRssChannel Loading of channel started:', channel.name);
        dispatch(actionLoadFeedRequest(channel));
    };
}

/**
 * Load RSS channels data
 */
function loadRssChannels() {
    return dispatch => {
        let parser = new RssParser();

        config.rssChannels.map(channel => {
            dispatch(loadFeedRequest(channel));
            let promise = parser.parseURL(channel.sourceUrl);

            return promise.then(((sourceData, result) => {
                if (result){
                    dispatch(loadFeedReceived(sourceData, result));
                } else {
                    dispatch(loadFeedError(sourceData.name, 'Feed contains no data!'));
                }
            }).bind(null, channel)).catch(err => {
                dispatch(actionLoadFeedError(err));
            });
        });
    };
}

// ============ actions ===========

/**
 * @param error {string}
 * @returns {{type: string, error: string}}
 */
function actionLoadFeedError(error) {
    return {
        type: ActionTypes.SOURCE_LOAD_FEED_ERROR,
        error: error
    }
}

/**
 * @param data {Object} feed
 * @returns {{type: string, data: object}}
 */
function actionLoadFeedReceived(data) {
    return {
        type: ActionTypes.SOURCE_LOAD_FEED_RECEIVED,
        data: data
    }
}

/**
 * @param sourceData {Object} Request source data
 * @returns {{type: string, data: object}}
 */
function actionLoadFeedRequest(sourceData) {
    return {
        type: ActionTypes.SOURCE_LOAD_FEED_REQUEST,
        data: sourceData
    }
}

// ============ export ===========

export default {
    actionLoadFeedError: actionLoadFeedError,
    load: load
}

