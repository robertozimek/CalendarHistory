import React from 'react';
import ReactDOM from 'react-dom';
import CalendarHistory from './CalendarHistory.jsx';

let sampleDate = new Date();
sampleDate.setDate(23);
let sampleDate2 = new Date();
sampleDate2.setDate(5);

let incidents = [
    {
        date: {
            start: sampleDate
        },
        cssClass: 'turquoise'
    },
    {
        date: {
            start: sampleDate2
        },
        cssClass: 'turquoise'
    }
];

console.log(incidents);

ReactDOM.render(
    <CalendarHistory 
        startDate={new Date()} 
        daysOfHistory={90}
        showNumbersOnDays={true}
        incidents={incidents}
    />, 
    document.getElementById('container')
);