import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

class NewsBox extends React.PureComponent {
    static propTypes = {
        date: PropTypes.string,
        channel: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        url: PropTypes.string,
        type: PropTypes.string
    };

    render() {
        let classes = classnames("news-box", this.props.type);

        return (
            <div className={classes}>
                <div className="news-avatar">
                    <i className={this.getAvatar()}></i>
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

    getAvatar(){
        switch (this.props.type) {
            case "blog":
                return "fab fa-blogger";
            case "web":
                return "fas fa-globe-europe";
            default:
                return "fas fa-file";
        }
    }
}

export default NewsBox;
