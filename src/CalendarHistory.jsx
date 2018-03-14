import React from 'react';
import PropTypes from 'prop-types';
import { getMonthStartAndLength } from './CalendarHelper.js';
import CalendarMonth from './CalendarMonth.jsx';

class CalendarHistory extends React.Component {
    constructor(props) {
        super(props);
        this.historyStartAndLength = getMonthStartAndLength(props.startDate, props.daysOfHistory);
    }

    getCalendarMonths() {
        return this.historyStartAndLength.map((monthStartLength, index) =>
            <CalendarMonth
                key={index}
                monthStart={monthStartLength[0]}
                monthLength={monthStartLength[1]}
            />
        );
    }

    render() {
        return (
            <div>
                { this.getCalendarMonths() }
            </div>
        );
    }
}

CalendarHistory.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    daysOfHistory: PropTypes.number.isRequired
};

export default CalendarHistory;