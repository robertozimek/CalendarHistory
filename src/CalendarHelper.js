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

export function getMonthsStartAndLength(date, daysOfHistory) {
    let monthsOfHistory = (daysOfHistory / 30) + 1;
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    let historyStartAndLength = [];
    for (let i = 0; i < monthsOfHistory; i++) {
        let year = (currentMonth - i < 0) ? (currentYear - 1) : currentYear;
        let month = (currentMonth - i < 0) ? (12 + currentMonth - i) : (currentMonth - i);

        let {firstDay, monthLength} = getFirstDayOfMonthAndNumberOfDays(month, year);
        historyStartAndLength.push({month: month, year: year, start: firstDay, length: monthLength});
    }

    return historyStartAndLength.reverse();
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
