import datetime from '../../utils/datetime';

describe('datetime', () => {
    describe('#isOlderThan', () => {
        it('should return true, if the date is older than 10 days', () => {
            let now = '2018-09-17T13:45:03Z';
            let then = '2018-09-06T13:45:03Z';
            let period = 10;
            expect(datetime.isOlderThan(now, then, period)).toBeTruthy();
        });

        it('should return false, if the date is not older than 10 days', () => {
            let now = '2018-09-17T13:45:03Z';
            let then = '2018-09-08T13:45:03Z';
            let period = 10;
            expect(datetime.isOlderThan(now, then, period)).toBeFalsy();
        });

        it('should return false, if the date is exactly 10 days older', () => {
            let now = '2018-09-17T13:45:03Z';
            let then = '2018-09-07T13:45:03Z';
            let period = 10;
            expect(datetime.isOlderThan(now, then, period)).toBeFalsy();
        });
    });

    describe('#getTimePeriodSplitted', () => {
        let now = '2018-11-01T18:00:00';

        it('should return NOW as readable string', () => {
            let date = '2018-11-01T17:57:01';
            let expectedResult = {
                year: 2018,
                month: 11,
                day: 1,
                hours: 17,
                minutes: 57,
                weekday: 4,
                readableStringFromNow: 'now'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });

        it('should return 39 MINUTES as readable string', () => {
            let date = '2018-11-01T17:20:35';
            let expectedResult = {
                year: 2018,
                month: 11,
                day: 1,
                hours: 17,
                minutes: 20,
                weekday: 4,
                readableStringFromNow: '39 minutes ago'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });

        it('should return 3 HOURS as readable string', () => {
            let date = '2018-11-01T14:20:35';
            let expectedResult = {
                year: 2018,
                month: 11,
                day: 1,
                hours: 14,
                minutes: 20,
                weekday: 4,
                readableStringFromNow: '3 hours ago'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });

        it('should return TODAY as readable string', () => {
            let date = '2018-11-01T11:20:35';
            let expectedResult = {
                year: 2018,
                month: 11,
                day: 1,
                hours: 11,
                minutes: 20,
                weekday: 4,
                readableStringFromNow: 'today'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });

        it('should return YESTERDAY as readable string', () => {
            let date = '2018-10-31T23:20:35';
            let expectedResult = {
                year: 2018,
                month: 10,
                day: 31,
                hours: 23,
                minutes: 20,
                weekday: 3,
                readableStringFromNow: 'yesterday'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });

        it('should return TUESDAY as readable string', () => {
            let date = '2018-10-30T23:20:35';
            let expectedResult = {
                year: 2018,
                month: 10,
                day: 30,
                hours: 23,
                minutes: 20,
                weekday: 2,
                readableStringFromNow: 'tuesday'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });
        it('should return SATURDAY as readable string', () => {
            let date = '2018-10-27T23:20:35';
            let expectedResult = {
                year: 2018,
                month: 10,
                day: 27,
                hours: 23,
                minutes: 20,
                weekday: 6,
                readableStringFromNow: 'saturday'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });
        it('should return MORE THAN WEEK as readable string', () => {
            let date = '2018-10-25T23:20:35';
            let expectedResult = {
                year: 2018,
                month: 10,
                day: 25,
                hours: 23,
                minutes: 20,
                weekday: 4,
                readableStringFromNow: 'more than week ago'
            };
            expect(datetime.getDateSplitted(now, date)).toEqual(expectedResult);
        });
    });
});