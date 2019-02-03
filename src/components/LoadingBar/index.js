import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

class LoadingBar extends React.PureComponent {
    static propTypes = {
        started: PropTypes.number,
        success: PropTypes.number,
        total: PropTypes.number,
        error: PropTypes.number
    };

    render() {
        let loaded = (this.props.success + this.props.error) / this.props.total;

        let innerStyle = {
            width: `${loaded * 100}%`
        };

        return (
            <div className="loading-bar-container">
                <div className="loading-bar">
                    <div className="loading-bar-inner" style={innerStyle}></div>
                </div>
                {this.props.error ? (
                    <div className="loading-bar-error">{`${this.props.error} sources failed to load`}</div>
                ) : null}
            </div>
        );
    }
}

export default LoadingBar;
