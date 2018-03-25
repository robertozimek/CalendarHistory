import React from 'react';
import ReactDOM from 'react-dom';
import CalendarHistory from './CalendarHistory.jsx';

let sampleDate = new Date();
let sampleDate2 = new Date();
sampleDate2.setMonth(1);

ReactDOM.render(
    <CalendarHistory 
        startDate={new Date()} 
        daysOfHistory={90}
        showNumbersOnDays={true}
        incidents={[
            {
                date: {
                    start: sampleDate
                },
                cssClass: 'turquoise',
            },
            {
                date: {
                    start: sampleDate2,
                    end: sampleDate
                },
                cssClass: 'turquoise',
            }
        ]}
    />, 
    document.getElementById('container')
);