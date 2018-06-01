// import {createSelector} from 'reselect';
// import _ from 'lodash';

const getData = state => (state.sources.data && state.sources.data.length) ? state.sources.data[0].title : null;

export default {
    getData: getData
};