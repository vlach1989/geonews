import { connect } from 'react-redux';
import Action from '../../state/Action'
import Select from '../../state/Select';

import Loader from '../presentation/Loader'

const mapStateToProps = (state, ownProps) => {
    return {
        test: Select.sources.getData(state)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load: (key) => {
            dispatch(Action.sources.load());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);