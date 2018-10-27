import { connect } from 'react-redux';

import Action from '../../state/Action';
import Presentation from './presentation';
import Select from '../../state/Select'

const mapStateToProps = (state, ownProps) => {
    return {
        data: Select.news.getAllWithSourcesByDate(state)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initialLoad: () => {
            dispatch(Action.sources.initialLoad());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);