import React from 'react';
import PropTypes from 'prop-types';

class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        if(this.props.onClickHandler && typeof this.props.onClickHandler === 'function') {
            this.props.onClickHandler.call(this, event, this.props.incident);
        }
    }

    handleMouseOver(event) {
        event.preventDefault();
        if(this.props.onMouseOverHandler && typeof this.props.onMouseOverHandler === 'function') {
            this.props.onMouseOverHandler.call(this, event, this.props.incident);
        }
    }

    handleMouseLeave(event) {
        event.preventDefault();
        if(this.props.onMouseLeaveHandler && typeof this.props.onMouseLeaveHandler === 'function') {
            this.props.onMouseLeaveHandler.call(this, event, this.props.incident);
        }
    }

    render() {
        let isBlank = this.props.isBlankDay || false;
        let isFiller = this.props.isFillerDay || false;
        let incident = this.props.incident;
        let content = this.props.shouldShowDay ? this.props.dayNumber : incident.content;
        let historyDayClass = 'historyDay ' +
            (isBlank ? 'blank' : 'day ') +
            (isFiller ? 'filler' : '') +
            (incident.cssClass != null ? ' ' + incident.cssClass : '');

        return(
            <div
                className={historyDayClass}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className='dayContent' dangerouslySetInnerHTML={{__html: content}}>
                </div>
            </div>
        );
    }
}

CalendarDay.propTypes = {
    isBlankDay: PropTypes.bool,
    incident: PropTypes.object,
    fillerDays: PropTypes.number
};

export default CalendarDay;