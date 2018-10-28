import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import NewsBox from "../NewsBox/presentation";
import datetime from "../../utils/datetime";

class Page extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array,
        initialLoad: PropTypes.func
    };

    componentDidMount(){
        this.props.initialLoad();
        this.now = new Date().toISOString();
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
                    date={datetime.getDateForNewsBox(this.now, newsItem.published)}
                    channel={newsItem.source.title}
                    title={newsItem.title}
                    url={newsItem.url}
                />
            );
        });
    }
}

export default Page;
