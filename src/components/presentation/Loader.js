import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.PureComponent {
    static propTypes = {
        initialLoad: PropTypes.func
    };

    componentDidMount(){
        this.props.initialLoad();
    }

    render() {
        return (
            <div className="test-component">
                Test
            </div>
        );
    }
}

export default Loader;
