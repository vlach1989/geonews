import {createSelector} from 'reselect';
// import _ from 'lodash';

const getData = state => (state.sources.data && state.sources.data.length) ? state.sources.data : null;

export default {
    getData: getData
};