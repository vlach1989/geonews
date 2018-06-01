import React from 'react';
// import PropTypes from 'prop-types';

class Test extends React.PureComponent {

    componentDidMount(){
        this.props.load('blabla');
    }

    render() {
        return (
            <div className="test-component">
                {this.props.test}
            </div>
        );
    }

}
export default Test;
