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
});