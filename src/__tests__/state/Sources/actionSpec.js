import Action from '../../../state/Action';
import ActionTypes from '../../../constants/ActionTypes';

describe('Sources actions', () => {
    it('should create an action when an error occurred while loading a feed', () => {
        const error = 'Error';
        const expectedAction = {
            type: ActionTypes.SOURCE_LOAD_FEED_ERROR,
            error: error
        };
        expect(Action.sources.actionLoadFeedError(error)).toEqual(expectedAction)
    })
});