import Select from '../../../state/Select';
import {SOURCES_INITAL_STATE} from '../Sources/selectorsSpec';

let INITIAL_STATE = {...SOURCES_INITAL_STATE,
    news: {
        byKey: {
            'dsdjfkshf': {
                channelKey: 'proStudentyGeomatiky',
                key: 'dsdjfkshf',
                title: 'Konec blogu',
                content: 'Lorem ipsum',
                htmlContent: '<p>Lorem ipsum</p>',
                published: '2018-09-17T13:45:03Z',
                author: "Otakar Čerba",
                url: "http://prostudenty.blogspot.com/dsdjfkshf"
            },
            'sdfjksdfkls': {
                channelKey: 'proStudentyGeomatiky',
                key: 'sdfjksdfkls',
                title: 'Konec blogu 2',
                content: 'Lorem ipsum',
                htmlContent: '<p>Lorem ipsum</p>',
                published: '2018-09-17T13:55:03Z',
                author: "Otakar Čerba",
                url: "http://prostudenty.blogspot.com/sdfjksdfkls"
            },
            'fasjfhdsdjkdh': {
                channelKey: 'proStudentyGeomatiky',
                key: 'fasjfhdsdjkdh',
                title: 'Konec geomatiky',
                content: 'Lorem ipsum',
                htmlContent: '<p>Lorem ipsum</p>',
                published: '2018-09-13T13:45:03Z',
                author: "Václav Čada",
                url: "http://prostudenty.blogspot.com/fasjfhdsdjkdh"
            }
        }
    }
};

describe('News selectors', () => {
    describe('#getAllWithSources', () => {
        it('should select all data as array extended with sources', () => {
            let selectedData = Select.news.getAllWithSources(INITIAL_STATE);
            expect(selectedData).toHaveLength(3);
            expect(selectedData[0]).hasOwnProperty('source');
        });

        it('should select null, if there is no data in sources.byKey or news.byKey or both', () => {
            let sourcesNullState = {...INITIAL_STATE, sources: {...INITIAL_STATE.sources, byKey: null}};
            let newsNullState = {...INITIAL_STATE, news: {...INITIAL_STATE.news, byKey: null}};
            let allNullState = {...newsNullState, sources: {...INITIAL_STATE.sources, byKey: null}};

            let selectedData = Select.news.getAllWithSources(sourcesNullState);
            expect(selectedData).toBeNull();

            let selectedData2 = Select.news.getAllWithSources(newsNullState);
            expect(selectedData2).toBeNull();

            let selectedData3 = Select.news.getAllWithSources(allNullState);
            expect(selectedData3).toBeNull();
        });
    });

    describe('#getAllWithSourcesByDate', () => {
        it('should select all data as array extended with sources ordered by date desc', () => {
            let selectedData = Select.news.getAllWithSourcesByDate(INITIAL_STATE);
            expect(selectedData).toHaveLength(3);
            expect(selectedData[0].published).toBe('2018-09-17T13:55:03Z');
            expect(selectedData[1].published).toBe('2018-09-17T13:45:03Z');
        });
    });
});