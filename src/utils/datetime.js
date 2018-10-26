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
    isOlderThan
}