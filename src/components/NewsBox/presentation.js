import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class NewsBox extends React.PureComponent {
    static propTypes = {
        date: PropTypes.string,
        channel: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        url: PropTypes.string,
    };

    render() {
        return (
            <div className="news-box">
                <div className="news-avatar">
                    <i className="fab fa-blogger"></i>
                </div>
                <div className="news-content">
                    <div className="news-header">
                        <span className="news-author">{this.props.channel}</span>
                    </div>
                    <div className="news-body">

                        {/* TODO specific component */}
                        <div className="news-article">
                            <h2 className="news-title">{this.props.title}</h2>
                            <p className="news-paragraph">{this.props.content}</p>
                        </div>

                    </div>
                    <div className="news-footer">
                        <div className="news-date-wrap">
                            <span className="news-date">{this.props.date}</span>
                        </div>
                        <div className="news-tools">
                            <a href={this.props.url} target="_blank">Link</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsBox;
