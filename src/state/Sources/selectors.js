import {createSelector} from 'reselect';
import _ from 'lodash';

const getData = state => (state.sources.data && state.sources.data.length) ? state.sources.data : null;

const getAllExtendedRecords = createSelector(
    [getData],
    (data) => {
        if (data && data.length){
            let records = data.map(channel => {
                return channel.items.map(item => {
                    let channelCopy = _.cloneDeep(channel);
                    delete channelCopy.items;
                    return {...channelCopy, ...item};
                });
            });
            return _.flatten(records);
        } else {
            return [];
        }
    }
);

const getAllExtendedRecordsSorted = createSelector(
    [getAllExtendedRecords],
    (records) => {
        return _.orderBy(records, ['date'], ['desc']);
    }
);

export default {
    getAllExtendedRecords: getAllExtendedRecords,
    getAllExtendedRecordsSorted: getAllExtendedRecordsSorted,
    getData: getData
};