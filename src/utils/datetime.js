/**
 * @param newsIsoString {string} ISO standard date
 * @returns {string}
 */
function getDateForNewsBox(newsIsoString) {
    // let nowDate = new Date(nowIsoString);
    let newsDate = new Date(newsIsoString);

    // TODO better handling of date
    let news = {
        day: newsDate.getDate(),
        month: newsDate.getMonth() + 1,
        year: newsDate.getFullYear()
    };

    return `${news.day}. ${news.month}. ${news.year}`;
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