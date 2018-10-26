import Select from '../../../state/Select';

let INITIAL_STATE = {
    sources: {
        byKey: {
            proStudentyGeomatiky: {
                key: "proStudentyGeomatiky",
                title: "Pro studenty geomatiky",
                type: "blog", //enumeration
                sourceType: "rssChannel",
                language: "cz",
                originUrl: "http://prostudenty.blogspot.com/",
                sourceUrl: "http://www.blogger.com",
                labels: ["education", "non-official"], //enumaration
            },
            blogujiciGeomatici: {
                key: "blogujiciGeomatici",
                title: "Blogující geomatici",
                type: "blog", //enumeration
                sourceType: "rssChannel",
                language: "cz",
                originUrl: "http://blogujicigeomatici.blogspot.com/",
                sourceUrl: "http://www.blogger.com",
                labels: ["education", "non-official"], //enumaration
            }
        }
    }
};

describe('Sources selectors', () => {
    describe('#getAll', () => {
        it('should select all data as array', () => {
            let selectedData = Select.sources.getAll(INITIAL_STATE);
            expect(selectedData).toHaveLength(2);
        });

        it('should select null, if there is no data in byKey', () => {
            let nullState = {...INITIAL_STATE, sources: {...INITIAL_STATE.sources, byKey: null}};
            let selectedData = Select.sources.getAll(nullState);
            expect(selectedData).toBeNull();
        });
    });

    describe('#getAllByType', () => {
        it('should select all data groupedByType', () => {
            let selectedData = Select.sources.getAllByType(INITIAL_STATE);
            expect(selectedData).hasOwnProperty('rssChannel');
            expect(selectedData.rssChannel).toHaveLength(2);
        });

        it('should select null, if there is no data in byKey', () => {
            let nullState = {...INITIAL_STATE, sources: {...INITIAL_STATE.sources, byKey: null}};
            let selectedData = Select.sources.getAllByType(nullState);
            expect(selectedData).toBeNull();
        });
    });
});

export const SOURCES_INITAL_STATE = INITIAL_STATE;