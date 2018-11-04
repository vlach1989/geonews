import RssParser from 'rss-parser';
import _ from 'lodash';
import config from '../../config';
import datetime from '../../utils/datetime';

import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';
import NewsActions from '../News/actions';

import {sources} from '../../resources/geonews/index';

const TTL = 5;

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
 * @param parser {Object}
 * @param channel {Object}
 * @param [ttl] {number} number of attempts
 * @returns {Function}
 */
function rssRequest(parser, channel, ttl) {
    return (dispatch) => {
        if (_.isUndefined(ttl)) ttl = TTL;
        console.log(`### state/Sources/actions#loadFeedsFromRss: ${ttl} attempts left for channel ${channel.title}`);

        let url = channel.proxy ? config.corsProxy + channel.sourceUrl : channel.sourceUrl;
        let promise = parser.parseURL(url);

        return promise.then(((sourceData, result) => {
            if (result && result.items && result.items.length){
                dispatch(loadFeedReceived(sourceData, result.items));
            } else {
                dispatch(loadFeedError(sourceData.key, 'Feed contains no data!'));
            }
        }).bind(null, channel), (err) => {
            if (ttl - 1) {
                dispatch(rssRequest(parser, channel, ttl - 1));
            } else {
                dispatch(actionLoadFeedError(channel.key, err));
            }
        }).catch(err => {
            if (ttl - 1) {
                dispatch(rssRequest(parser, channel, ttl - 1));
            } else {
                dispatch(actionLoadFeedError(channel.key, err));
            }
        });
    }
}

function loadFeedsFromRss(channels) {
    return (dispatch) => {
        let parser = new RssParser();
        channels.map(channel => {
            dispatch(loadFeedRequest(channel.key));
            dispatch(rssRequest(parser, channel));
        });
    }
}

function loadFeedError(channelKey, error){
    return dispatch => {
        console.warn('state/Sources/actions#loadRssChannel Error occurred while loading channel:', channelKey);
        console.warn('state/Sources/actions#loadRssChannel Error:', error);
        dispatch(actionLoadFeedError(channelKey, error));
    };
}

function loadFeedReceived(channel, records){
    return dispatch => {
        console.log('state/sources/actions#loadRssChannel Result received for channel:', channel.title);
        dispatch(actionLoadFeedReceived(channel.key, records));

        let now = new Date().toISOString();
        let data = [];

        records.forEach(record => {
            let isOlder = datetime.isOlderThan(now, (record.pubDate || record.isoDate), config.days);

            if (!isOlder){
                data.push({
                    key: record.id || record.guid || record.link,
                    channelKey: channel.key,
                    title: record.title,
                    content: record.contentSnippet,
                    htmlContent: record.content,
                    published: record.isoDate || record.pubDate,
                    author: record.author,
                    url: record.link
                });
            }
        });
        dispatch(NewsActions.add(data));
    };
}

function loadFeedRequest(channelKey){
    return dispatch => {
        console.log('state/Sources/reducers#loadRssChannel Loading of channel started:', channelKey);
        dispatch(actionLoadFeedRequest(channelKey));
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
 * @param channelKey {string}
 * @param error {string}
 * @returns {{type: string, error: string}}
 */
function actionLoadFeedError(channelKey, error) {
    return {
        type: ActionTypes.SOURCES.LOAD_FEED.ERROR,
        key: channelKey,
        error: error
    }
}

/**
 * @param channelKey {string}
 * @param data {Object} feed
 * @returns {{type: string, data: object}}
 */
function actionLoadFeedReceived(channelKey, data) {
    return {
        type: ActionTypes.SOURCES.LOAD_FEED.RECEIVED,
        key: channelKey,
        data: data
    }
}

/**
 * @param sourceKey {string} Source key
 * @returns {{type: string, data: object}}
 */
function actionLoadFeedRequest(sourceKey) {
    return {
        type: ActionTypes.SOURCES.LOAD_FEED.REQUEST,
        key: sourceKey
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

