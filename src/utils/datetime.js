/**
 *  @param nowIsoString {string} ISO standard date
 * @param thenIsoString {string} ISO standard date
 * @returns {Object}
 */
function getDateSplitted(nowIsoString, thenIsoString) {
    let now = getDateParsed(nowIsoString);
    let then = getDateParsed(thenIsoString);
    let yesterday = getYesterday(nowIsoString);

    let readablePeriod = null;
    let {ms, ...period} = then;

    if (now.day === then.day && now.month === then.month && now.year === then.year){
        let diff = now.ms - then.ms;
        if (diff < 180000){
            readablePeriod = 'now';
        } else if (diff < 3600000){
            readablePeriod = `${Math.floor(diff/60000)} minutes ago`;
        } else if (diff < 21600000){
            let numberOfHours = Math.floor(diff/3600000);
            let hourString = numberOfHours > 1 ? 'hours ago' : 'hour ago';
            readablePeriod = `${numberOfHours} ${hourString}`;
        } else if (diff < 64800000){
            readablePeriod = 'today';
        }
    } else if (yesterday.day === then.day && yesterday.month === then.month && yesterday.year === then.year){
        readablePeriod = 'yesterday';
    } else if (((now.ms - then.ms) < 604800000) && (then.weekday !== now.weekday)){
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        readablePeriod = days[then.weekday];
    } else {
        readablePeriod = 'more than week ago';
    }
    return {...period, readableStringFromNow: readablePeriod};
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
        hours: date.getHours(),
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

/**
 * @param dateNow {string} ISO standard date
 * @param dateThen {string} ISO standard date
 * @returns {boolean} True, if date is later than other date
 */
function isLaterThan(dateNow, dateThen) {
    let now = new Date(dateNow).getTime();
    let then = new Date(dateThen).getTime();
    return (now > then);
}

export default {
    getDateSplitted,
    isOlderThan,
    isLaterThan
}