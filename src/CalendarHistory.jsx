import React from 'react';
import PropTypes from 'prop-types';
import {getMonthsStartAndLength, getEventsForMonth, isDateInRangeOfDates} from './CalendarHelper.js';
import CalendarMonth from './CalendarMonth.jsx';

class CalendarHistory extends React.Component {
    constructor(props) {
        super(props);
        this.historyStartAndLength = getMonthsStartAndLength(props.startDate, props.daysOfHistory);
    }

    getCalendarMonths() {
        return this.historyStartAndLength
            .map((monthStartLength, index) =>
                <CalendarMonth
                    key={index}
                    month={monthStartLength.month}
                    year={monthStartLength.year}
                    monthStart={monthStartLength.start}
                    monthLength={monthStartLength.length}
                    incidents={this.getIncidentsForMonth(monthStartLength.month, monthStartLength.year)}
                    eventTrigger={this.props.trigger}
                    eventHandlerCallback={this.props.callback}
                />
            );
    }

    getIncidentsForMonth(month, year) {
        let incidents = this.props.incidents || [];

        let incidentsForMonth = incidents.filter((incident) => {
            let dateForMonth = new Date(
                year, 
                month, 
                incident.date.start.getDate() // Any day within range
            );
            return incident.date.hasOwnProperty('end') 
                ? isDateInRangeOfDates(incident.date.start, incident.date.end, dateForMonth) 
                : incident.date.start.getMonth() === month && incident.date.start.getYear() === year;
        });

        return incidentsForMonth;
    }

    render() {
        return (
            <div className='calendarHistory'>
                {this.getCalendarMonths()}
            </div>
        );
    }
}

CalendarHistory.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    daysOfHistory: PropTypes.number.isRequired,
    events: PropTypes.object
};

export default CalendarHistory;