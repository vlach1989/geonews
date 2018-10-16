import {createSelector} from 'reselect';
import _ from 'lodash';

const getAllByKey = state => state.sources.byKey;

const getAll = createSelector(
    [getAllByKey],
    (sources) => {
        let sourcesAsArray = [];
        if (sources){
            _.forIn(sources, (source) => {
                sourcesAsArray.push(source);
            });
        }
        return sourcesAsArray.length ? sourcesAsArray : null;
    }
);

const getAllByType = createSelector(
    [getAll],
    (sources) => {
        if (sources){
            return _.groupBy(sources, (source) => {
                return source.sourceType;
            });
        }
        return null;
    }
);

export default {
    getAll,
    getAllByType
};