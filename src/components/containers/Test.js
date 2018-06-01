import { connect } from 'react-redux';
import Action from '../../state/Action'
import Select from '../../state/Select';

import Test from '../presentation/Test'

const mapStateToProps = (state, ownProps) => {
    return {
        test: Select.sources.getTest(state)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load: (key) => {
            dispatch(Action.sources.test(key));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);