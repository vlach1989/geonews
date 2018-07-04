import Select from '../../../state/Select';
import {Selector} from 'redux-testkit';

let state = {
    sources: {
        data: [{
            name: "Pro studenty geomatiky",
            link: "http://prostudenty.blogspot.com/",
            type: "blog",
            items: [{
                title: "Twitter",
                link: "http://prostudenty.blogspot.com/2018/07/twitter_2.html",
                pubDate: "2018-07-02T06:46:21.352Z",
                author: "Otakar Čerba"
            }, {
                title: "Twitter",
                link: "http://prostudenty.blogspot.com/2018/05/twitter_30.html",
                pubDate: "2018-05-30T08:36:15.180Z",
                author: "Otakar Čerba"
            }]
        },{
            name: "ACP",
            link: "http://acposta.cz/",
            type: "web",
            items: [{
                title: "AAA",
                pubDate: "2018-07-05T06:46:21.352Z",
                author: "Pavel"
            }, {
                title: "BBB",
                pubDate: "2018-05-01T08:36:15.180Z",
                author: "Martin"
            }]
        }]
    }
};

describe('Sources selectors', () => {
    it('should select all data from sources', () => {
        Selector(Select.sources.getData).expect(state).toReturn(state.sources.data);
    });
});