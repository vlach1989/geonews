import RssParser from 'rss-parser';
import _ from 'lodash';
import config from '../../config';
import datetime from '../../utils/datetime';

import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';
import NewsActions from '../News/actions';

import {sources} from '../../resources/index';

// ============ creators ===========

/**
 * Add sources from config file
 */
function addSources() {
    return dispatch => {
        dispatch(actionAddSources(sources));
    }
}

/**
 * Initial load of data for application. It adds sources and loads feeds from them.
 */
function initialLoad() {
    return dispatch => {
        dispatch(addSources());
        dispatch(loadFeedsFromSources());
    };
}

/**
 * It loads feeds by source type from all sources present in the store
 */
function loadFeedsFromSources() {
    return (dispatch, getState) => {
        let state = getState();
        let sourcesByType = Select.sources.getAllByType(state);

        _.forIn(sourcesByType, (sources, type) => {
            if (type === 'rssChannel'){
                dispatch(loadFeedsFromRss(sources));
            } else {
                // todo add support for other source types
                // todo handling of action errors
                console.warn('state/Sources/actions/loadFeeedsFromSources: Unknown source type: ', type);
                dispatch(actionUnknownSourceType(type));
            }
        });
    }
}

/**
 * Load news from RSS channels
 * @param channels {data} list of channels
 * @returns {Function}
 */
function loadFeedsFromRss(channels) {
    return (dispatch) => {
        let parser = new RssParser();
        channels.map(channel => {
            dispatch(loadFeedRequest(channel));
            let promise = parser.parseURL(config.corsProxy + channel.sourceUrl);

            return promise.then(((sourceData, result) => {
                if (result && result.items && result.items.length){
                    dispatch(loadFeedReceived(sourceData, result.items));
                } else {
                    dispatch(loadFeedError(sourceData.name, 'Feed contains no data!'));
                }
            }).bind(null, channel)).catch(err => {
                dispatch(actionLoadFeedError(err));
            });
        });
    }
}

function loadFeedError(channel, error){
    return dispatch => {
        console.warn('state/Sources/actions#loadRssChannel Error occurred while loading channel:', channel.title);
        console.warn('state/Sources/actions#loadRssChannel Error:', error);
        dispatch(actionLoadFeedError(error));
    };
}

function loadFeedReceived(channel, records){
    return dispatch => {
        console.log('state/sources/actions#loadRssChannel Result received for channel:', channel.title);
        dispatch(actionLoadFeedReceived(records));

        let now = new Date().toISOString();
        let data = [];

        records.forEach(record => {
            let isOlder = datetime.isOlderThan(now, record.pubDate, config.days);
            if (!isOlder){
                data.push({
                    key: record.id,
                    channelKey: channel.key,
                    title: record.title,
                    content: record.contentSnippet,
                    htmlContent: record.content,
                    published: record.pubDate,
                    author: record.author,
                    url: record.link
                });
            }
        });
        dispatch(NewsActions.add(data));
    };
}

function loadFeedRequest(channel){
    return dispatch => {
        console.log('state/Sources/reducers#loadRssChannel Loading of channel started:', channel.title);
        dispatch(actionLoadFeedRequest(channel));
    };
}

// ============ actions ===========

function actionAddSources(sources){
    return {
        type: ActionTypes.SOURCES.ADD,
        sources: sources
    }
}

/**
 * @param error {string}
 * @returns {{type: string, error: string}}
 */
function actionLoadFeedError(error) {
    return {
        type: ActionTypes.SOURCES.LOAD_FEED.ERROR,
        error: error
    }
}

/**
 * @param data {Object} feed
 * @returns {{type: string, data: object}}
 */
function actionLoadFeedReceived(data) {
    return {
        type: ActionTypes.SOURCES.LOAD_FEED.RECEIVED,
        data: data
    }
}

/**
 * @param sourceData {Object} Request source data
 * @returns {{type: string, data: object}}
 */
function actionLoadFeedRequest(sourceData) {
    return {
        type: ActionTypes.SOURCES.LOAD_FEED.REQUEST,
        data: sourceData
    }
}

/**
 * @param sourceType {string}
 * @returns {{type: string, sourceType: string}}
 */
function actionUnknownSourceType(sourceType) {
    return {
        type: ActionTypes.SOURCES.UNKNOWN_SOURCE_TYPE,
        sourceType: sourceType
    }
}

// ============ export ===========

export default {
    actionLoadFeedError,
    initialLoad
}

