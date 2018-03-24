import React from 'react';
import PropTypes from 'prop-types';

class CalendarDay extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        if(this.props.onClickHandler && typeof this.props.onClickHandler === 'function') {
            this.props.onClickHandler.call(this, event);
        }
    }

    render() {
        let isFiller = this.props.isFillerDay;
        let customClass = this.props.customClass;
        let content = this.props.dayContent;
        let historyDayClass = 'historyDay ' +
            (isFiller ? 'filler' : 'day') +
            (customClass != null ? ' ' + customClass : '');

        return(
            <div className={historyDayClass} onClick={this.handleClick}>
                <div className='dayContent'>
                    { content }
                </div>
            </div>
        );
    }
}

CalendarDay.propTypes = {
    isFillerDay: PropTypes.bool.isRequired,
    customClass: PropTypes.string,
    dayContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default CalendarDay;