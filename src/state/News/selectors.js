import {createSelector} from 'reselect';
import _ from 'lodash';

import SourcesSelectors from '../Sources/selectors';

const getAllByKey = state => state.news.byKey;

const getAllWithSources = createSelector(
    [getAllByKey, SourcesSelectors.getAllByKey],
    (news, sources) => {
        if (news && sources){
            let extendedNews = [];
            _.forIn(news, (newsData, key) => {
                let channelData = sources[newsData.channelKey];
                extendedNews.push({
                    ...newsData,
                    source: channelData,
                    key: key
                });
            });
            return extendedNews;
        } else {
            return null;
        }
    }
);

const getAllWithSourcesByDate = createSelector(
    [getAllWithSources],
    (news) => {
        if (news){
            return _.orderBy(news, ['published'], ['desc']);
        } else {
            return null;
        }
    }
);

export default {
    getAllWithSources,
    getAllWithSourcesByDate
}