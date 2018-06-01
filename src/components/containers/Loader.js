import { connect } from 'react-redux';
import Action from '../../state/Action'
import Select from '../../state/Select';

import Loader from '../presentation/Loader'

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

export default connect(mapStateToProps, mapDispatchToProps)(Loader);