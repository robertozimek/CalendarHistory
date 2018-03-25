import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay.jsx';
import {isDateInRangeOfDates} from './CalendarHelper';

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
                    incident={{}}
                />
            );
        }
        return fillerDays;
    }

    getDaysOfMonth(numberOfDaysInMonth) {
        let days = [];
        for(let i = 0; i < numberOfDaysInMonth; i++) {
            let dayNumber = i + 1;
            let incident = this.getIncidentForDay(dayNumber);
            days.push(
                <CalendarDay
                    key={'day-' + i}
                    isFillerDay={false}
                    dayNumber={dayNumber}
                    incident={incident}
                    shouldShowDay={this.props.showNumbersOnDays}
                />
            );
        }
        return days;
    }

    getIncidentForDay(day) {
        let incidents = this.props.incidents || [];

        let dateForDay = new Date(this.props.year, this.props.month, day);
        let foundIncident = incidents.find(incident => {
            return incident.date.hasOwnProperty('end') 
                ? isDateInRangeOfDates(incident.date.start, incident.date.end, dateForDay)
                : incident.date.start.getDate() === day;
        });

        return foundIncident || {};
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