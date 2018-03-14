import React from 'react';
import ReactDOM from 'react-dom';
import { getFirstDayOfMonthAndNumberOfDays } from './CalendarHelper.js';

export default class CalendarHistory extends React.Component {
    constructor(props) {
        super(props);
        const date = props.startDate;
        const monthsOfHistory = props.monthsOfHistory;

        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();

        this.historyStartAndLength = [];
        for (let i = 0; i < monthsOfHistory; i++) {
            let year = (currentMonth - i < 0) ? (currentYear - 1) : currentYear;
            let month = (currentMonth - i < 0) ? (12 + currentMonth - i) : (currentMonth - i);

            let {firstDay, monthLength} = getFirstDayOfMonthAndNumberOfDays(month, year);
            this.historyStartAndLength.push([firstDay, monthLength]);
        }
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}