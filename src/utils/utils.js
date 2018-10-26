import _ from 'lodash';

export default {
    /**
     * Takes deep object and returns it with values containing path to that key in the object (where value isn't a nested object).
     * e.g. {a: null, b: {c: null, d: null}} => {a: 'a', b: {c: 'b.c', d: 'b.d'}}
     * Used for constants.
     * @param object - input object or nested object when called recursively
     * @param path - path to nested object when called recursively
     * @returns object
     */
    deepKeyMirror(object, path){
        if (_.isObjectLike(object)) {
            return _.mapValues(object, (value, key) => {
                return this.deepKeyMirror(value, path ? path + '.' + key : key);
            });
        } else {
            return path;
        }
    }
}