import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay.jsx';

class CalendarMonth extends React.Component {
    constructor(props) {
        super(props);
    }

    getFillerDays(numberOfFillerDays) {
        let fillerDays = [];
        for(let i = 0; i < numberOfFillerDays; i++) {
            fillerDays.push(
                <CalendarDay
                    key={i}
                    isFillerDay={true}
                />
            );
        }
        return fillerDays;
    }

    getDaysOfMonth(numberOfDaysInMonth) {
        let days = [];
        for(let i = 0; i < numberOfDaysInMonth; i++) {
            days.push(
                <CalendarDay
                    key={i}
                    isFillerDay={false}
                />
            );
        }
        return days;
    }

    render() {
        return(
            <div className='calendar'>
                { this.getFillerDays(this.props.monthStart) }
                { this.getDaysOfMonth(this.props.monthLength) }
            </div>
        );
    }
}

CalendarMonth.propTypes = {
    monthStart: PropTypes.number.isRequired,
    monthLength: PropTypes.number.isRequired
};

export default CalendarMonth;