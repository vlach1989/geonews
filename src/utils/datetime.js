/**
 *  @param nowIsoString {string} ISO standard date
 * @param thenIsoString {string} ISO standard date
 * @returns {string}
 */
function getDateForNewsBox(nowIsoString, thenIsoString) {
    let now = getDateParsed(nowIsoString);
    let then = getDateParsed(thenIsoString);
    let yesterday = getYesterday(nowIsoString);

    if (now.day === then.day && now.month === then.month && now.year === then.year){
        return "today";
    } else if (yesterday.day === then.day && yesterday.month === then.month && yesterday.year === then.year){
        return "yesterday";
    } else {
        return `${then.day}. ${then.month}. ${then.year}`;
    }
}

/**
 * It returns the date parsed 24 hours back from nowIsoString
 * @param nowIsoString {string}
 * @returns {{day: number, month: number, year: number, weekday: number, hour: number, minutes: number, ms: number}}
 */
function getYesterday(nowIsoString) {
    let nowDate = new Date(nowIsoString);
    let nowMs = nowDate.getTime();
    let yesterdayMs = nowMs - 86400000;
    let yesterdayDate = new Date(yesterdayMs).toISOString();
    return getDateParsed(yesterdayDate);
}

/**
 * Return date parsed into components
 * @param isoString {string}
 * @returns {{day: number, month: number, year: number, weekday: number, hour: number, minutes: number, ms: number}}
 */
function getDateParsed(isoString) {
    let date = new Date(isoString);
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        weekday: date.getDay(),
        hour: date.getHours(),
        minutes: date.getMinutes(),
        ms: date.getTime()
    };
}

/**
 * @param dateNow {string} ISO standard date
 * @param dateThen {string} ISO standard date
 * @param period {number} number of days
 * @returns {boolean} True, if date is older than period from now
 */
function isOlderThan(dateNow, dateThen, period) {
    let now = new Date(dateNow).getTime();
    let then = new Date(dateThen).getTime();
    let periodMs = period * 86400000;
    return ((now - then) > periodMs);
}

export default {
    getDateForNewsBox,
    isOlderThan
}