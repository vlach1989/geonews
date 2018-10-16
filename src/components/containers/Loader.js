import { connect } from 'react-redux';

import Action from '../../state/Action'
import Loader from '../presentation/Loader'

const mapStateToProps = (state, ownProps) => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initialLoad: () => {
            dispatch(Action.sources.initialLoad());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);