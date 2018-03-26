import React from 'react';
import PropTypes from 'prop-types';
import {getMonthsStartAndLengthWithFillerDays, getEventsForMonth, isDateInRangeOfDates} from './CalendarHelper.js';
import CalendarMonth from './CalendarMonth.jsx';

class CalendarHistory extends React.Component {
    constructor(props) {
        super(props);
        let {
            historyStartAndLength, 
            firstMonthFillerDays, 
            lastMonthFillerDays
        } = getMonthsStartAndLengthWithFillerDays(props.startDate, props.daysOfHistory);

        this.historyStartAndLength = historyStartAndLength;
        this.firstMonthFillerDays = firstMonthFillerDays;
        this.lastMonthFillerDays = lastMonthFillerDays;
    }

    getCalendarMonths() {
        return this.historyStartAndLength
            .map((monthStartLength, index) => {
                let firstMonth = index === this.historyStartAndLength.length - 1;
                let lastMonth = index === 0;
                let monthLength = monthStartLength.length;

                if(firstMonth) {
                    monthLength = Math.abs(monthLength - this.firstMonthFillerDays);
                }
    
                if(lastMonth) {
                    monthLength = Math.abs(monthLength - this.lastMonthFillerDays);
                }
                
                return (<CalendarMonth
                    key={index}
                    month={monthStartLength.month}
                    year={monthStartLength.year}
                    monthStart={monthStartLength.start}
                    monthLength={monthLength}
                    beginningFillerDays={lastMonth ? this.lastMonthFillerDays : 0}
                    endingFillerDays={firstMonth ? this.firstMonthFillerDays : 0}
                    incidents={this.getIncidentsForMonth(monthStartLength.month, monthStartLength.year)}
                    eventTrigger={this.props.trigger}
                    eventHandlerCallback={this.props.callback}
                    showNumbersOnDays={this.props.showNumbersOnDays}
                />);
            });
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