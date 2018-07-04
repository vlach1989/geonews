import React from 'react';
// import PropTypes from 'prop-types';

class Loader extends React.PureComponent {

    componentDidMount(){
        this.props.load();
    }

    render() {
        let records = this.props.data.map(record => {
           return this.renderRecord(record);
        });
        return (
            <div className="test-component">
                {records}
            </div>
        );
    }

    renderRecord(record){
        return (
            <div key={record.id}>{record.date + ': ' + record.title}</div>
        );
    }

}
export default Loader;
