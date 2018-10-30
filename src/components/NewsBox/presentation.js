import React from 'react';
import PropTypes from 'prop-types';

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
                    <div className="news-box-top">
                        <div className="news-box-logo">W</div>
                        <div className="news-box-channel">{this.props.channel}</div>
                        <div className="news-box-date">Dnes</div>
                    </div>
                    <div className="news-box-title">{this.props.title}</div>
                </a>
            </div>
        );
    }
}

export default NewsBox;
