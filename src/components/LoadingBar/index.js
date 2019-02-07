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
        let loaded = (this.props.success + this.props.error);
        let loadedRatio = loaded / this.props.total;

        let innerStyle = {
            width: `${loadedRatio * 100}%`
        };

        let classes = classnames("loading-bar", {
           success: (loadedRatio === 1)
        });

        return (this.props.success || this.props.error ? (
            <div className="loading-bar-container">
                <div className={classes}>
                    <div className="loading-bar-inner" style={innerStyle}>
                        {`${loaded} of ${this.props.total}`}
                    </div>
                </div>
            </div>
        ) : null);
    }
}

export default LoadingBar;
