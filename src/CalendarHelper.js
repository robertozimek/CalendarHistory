import moment from 'moment'

export default function getFirstDayOfMonthAndNumberOfDays(month, year) {
    let firstDay = new Date(year, month - 1, 1).getDay();
    let monthLength = new Date(year, month, 0).getDate();

    return {
        firstDay,
        monthLength
    }
}