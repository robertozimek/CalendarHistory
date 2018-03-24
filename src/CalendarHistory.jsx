import React from 'react';
import PropTypes from 'prop-types';
import { getMonthsStartAndLength, getEventsForMonth } from './CalendarHelper.js';
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
                    monthStart={monthStartLength.start}
                    monthLength={monthStartLength.length}
                    incidents={this.getIncidentsForMonth(monthStartLength.month, monthStartLength.year)}
                    showNumbersOnDays={this.props.showNumbersOnDays}
                />
            );
    }

    getIncidentsForMonth(month, year) {
        let incidents = this.props.incidents || [];

        let incidentsForMonth = incidents.filter((incident) => {
           return incident.date.getMonth() === month
               && incident.date.getYear() === year;
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
    showNumbersOnDays: PropTypes.bool,
    events: PropTypes.object
};

export default CalendarHistory;