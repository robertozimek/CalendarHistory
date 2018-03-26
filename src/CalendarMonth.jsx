import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay.jsx';
import {isDateInRangeOfDates} from './CalendarHelper';

class CalendarMonth extends React.Component {
    constructor(props) {
        super(props);
    }

    getBlankDays(numberOfBlankDays) {
        let blankDays = [];
        for(let i = 0; i < numberOfBlankDays; i++) {
            blankDays.push(
                <CalendarDay
                    key={i}
                    isBlankDay={true}
                    incident={{}}
                />
            );
        }
        return blankDays;
    }

    getFillerDays(numberOfFillerDays) {
        let fillerDays = [];
        for(let i = 0; i < numberOfFillerDays; i++) {
            let offsetFillerDays = this.props.endingFillerDays > 0 
                ? this.props.monthLength - this.props.endingFillerDays + numberOfFillerDays
                : 0;
            let dayNumber = i + 1 + offsetFillerDays;
            fillerDays.push(
                <CalendarDay
                    key={i}
                    isFillerDay={true}
                    incident={{}}
                    dayNumber={dayNumber}
                    shouldShowDay={this.props.showNumbersOnDays}
                />
            )
        }
        return fillerDays;
    }

    getDaysOfMonth(numberOfDaysInMonth) {
        let days = [];
        for(let i = 0; i < numberOfDaysInMonth; i++) {
            let dayNumber = this.props.beginningFillerDays + i + 1;
            let incident = this.getIncidentForDay(dayNumber);
            days.push(
                <CalendarDay
                    key={'day-' + i}
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
                {this.getBlankDays(this.props.monthStart)}
                {this.getFillerDays(this.props.beginningFillerDays)}
                {this.getDaysOfMonth(this.props.monthLength)}
                {this.getFillerDays(this.props.endingFillerDays)}
            </div>
        );
    }
}

CalendarMonth.propTypes = {
    monthStart: PropTypes.number.isRequired,
    monthLength: PropTypes.number.isRequired,
    beginningFillerDays: PropTypes.number.isRequired,
    endingFillerDays: PropTypes.number.isRequired
};

export default CalendarMonth;