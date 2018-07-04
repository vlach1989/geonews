import React from 'react';
// import PropTypes from 'prop-types';

class Loader extends React.PureComponent {

    componentDidMount(){
        this.props.load();
    }

    render() {
        return (
            <div className="test-component">
                AAA
            </div>
        );
    }

}
export default Loader;
