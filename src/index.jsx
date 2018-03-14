import React from 'react';
import ReactDOM from 'react-dom';
import CalendarHistory from './CalendarHistory.jsx';

ReactDOM.render(
    <CalendarHistory 
        startDate={new Date()} 
        daysOfHistory={90}
    />, 
    document.getElementById('container')
);