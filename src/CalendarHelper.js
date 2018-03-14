import moment from 'moment'

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

export function getMonthStartAndLength(date, daysOfHistory) {
    let monthsOfHistory = (daysOfHistory / 30) + 1;
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    let historyStartAndLength = [];
    for (let i = 0; i < monthsOfHistory; i++) {
        let year = (currentMonth - i < 0) ? (currentYear - 1) : currentYear;
        let month = (currentMonth - i < 0) ? (12 + currentMonth - i) : (currentMonth - i);

        let {firstDay, monthLength} = getFirstDayOfMonthAndNumberOfDays(month, year);
        historyStartAndLength.push([firstDay, monthLength]);
    }

    return historyStartAndLength;
}

export function getLocaleWeekDayOffset() {
    let browserLocale = getBrowserLocale();
    let localeData = moment.localeData(browserLocale);
    return localeData.firstDayOfWeek();
}

export function getBrowserLocale() {
    return window.navigator.languages 
        && window.navigator.languages[0] 
        || window.navigator.language 
        || window.navigator.userLanguage;
}
