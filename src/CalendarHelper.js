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
