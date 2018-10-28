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

const getByKey = createSelector(
    [getAllByKey, (state, key) => key],
    (models, key) => {
        return models ? models[key] : null;
    }
);

const getGroupedLoadingStatus = createSelector(
    [getAll],
    (models) => {
        let status = {
            total: 0,
            started: 0,
            success: 0,
            error: 0
        };
        if (models){
            models.forEach(model => {
                status.total++;
                if (model.loadingStatus && model.loadingStatus === "started"){
                    status.started++;
                } else if (model.loadingStatus && model.loadingStatus === "success"){
                    status.success++;
                } else if (model.loadingStatus && model.loadingStatus === "error"){
                    status.error++;
                }
            });
        }
        return status;
    }
);

export default {
    getAll,
    getAllByKey,
    getAllByType,
    getByKey,
    getGroupedLoadingStatus
};