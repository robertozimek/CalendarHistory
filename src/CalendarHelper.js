import Moment from 'moment'
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export function getFirstDayOfMonthAndNumberOfDays(month, year) {
    let offset = getLocaleWeekDayOffset();

    let date = new Date(year, month, 1);
    let firstDay = moment(date).weekday() - offset;
    let monthLength = moment(date).daysInMonth();

    return {
        firstDay,
        monthLength
    }
}

export function getMonthsStartAndLengthWithFillerDays(date, daysOfHistory) {
    let monthsOfHistory = (daysOfHistory / 30) + 1;
    let currentDay = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let daysCounter = 0;
    let lastMonthFillerDays = 0;
    let firstMonthFillerDays = 0;

    let calculateFillerDays = (monthLength) => {
        daysCounter += monthLength;
        if((daysCounter - currentDay) > daysOfHistory) {
            lastMonthFillerDays = monthLength - ((daysCounter - currentDay) - daysOfHistory);
        }
    }

    let historyStartAndLength = [];
    for (let i = 0; i < monthsOfHistory; i++) {
        let year = (currentMonth - i < 0) ? (currentYear - 1) : currentYear;
        let month = (currentMonth - i < 0) ? (12 + currentMonth - i) : (currentMonth - i);

        let {firstDay, monthLength} = getFirstDayOfMonthAndNumberOfDays(month, year);
        calculateFillerDays(monthLength);
        if(i === 0) firstMonthFillerDays = monthLength - currentDay;
        historyStartAndLength.push({month: month, year: year, start: firstDay, length: monthLength});
    }

    return {
        historyStartAndLength: historyStartAndLength.reverse(),
        firstMonthFillerDays: firstMonthFillerDays,
        lastMonthFillerDays: lastMonthFillerDays
    };
}

export function getLocaleWeekDayOffset() {
    let browserLocale = getBrowserLocale();
    let localeData = moment.localeData(browserLocale);
    return localeData.firstDayOfWeek();
}

export function isDateInRangeOfDates(startDate, endDate, date) {
    let start = clearTimeFromDate(startDate);
    let end = clearTimeFromDate(endDate);

    let dateRange = moment().range(start, end);

    return dateRange.contains(date);
}

function clearTimeFromDate(date) {
    let newDate = date;
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
}

export function getBrowserLocale() {
    return window.navigator.languages 
        && window.navigator.languages[0] 
        || window.navigator.language 
        || window.navigator.userLanguage;
}
