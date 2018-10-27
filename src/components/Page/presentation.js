import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import NewsBox from "../NewsBox/presentation";

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
            <div className="main">
                {this.props.data ? this.renderContent() : "Loading"}
            </div>
        );
    }

    renderContent(){
        return this.props.data.map(newsItem => {
            return (
                <NewsBox
                    date={newsItem.published}
                    channel={newsItem.source.title}
                    title={newsItem.title}
                    url={newsItem.url}
                />
            );
        });
    }
}

export default Page;
