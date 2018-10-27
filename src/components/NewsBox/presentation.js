import React from 'react';
import PropTypes from 'prop-types';
import datetime from '../../utils/datetime';

import './style.css';

class NewsBox extends React.PureComponent {
    static propTypes = {
        date: PropTypes.string,
        channel: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
    };

    render() {
        return (
            <div className="news-box">
                <a className="news-box-headline" href={this.props.url} target="_blank">
                    <div className="news-date">{datetime.getDateForNewsBox(this.props.date)}</div>
                    <div className="news-title">
                            <span className="news-title-channel">{this.props.channel}</span>
                            <span className="news-title-text">{this.props.title}</span>
                    </div>
                </a>
            </div>
        );
    }
}

export default NewsBox;
