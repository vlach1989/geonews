import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array,
        initialLoad: PropTypes.func
    };

    componentDidMount(){
        this.props.initialLoad();
    }

    render() {
        return (
            <div className="test-component">
                {this.props.data ? this.renderContent() : "Loading"}
            </div>
        );
    }

    renderContent(){
        let content = this.props.data.map(newsItem => {
            return (
                <tr>
                    <td>{newsItem.source.title}</td>
                    <td>{newsItem.title}</td>
                    <td>{newsItem.published}</td>
                </tr>
            );
        });

        return (
            <table>{content}</table>
        );
    }
}

export default Page;
