import React from 'react';

class Loader extends React.PureComponent {

    componentDidMount(){
        this.props.load();
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
