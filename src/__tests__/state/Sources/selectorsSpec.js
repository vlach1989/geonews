import Select from '../../../state/Select';
import {Selector} from 'redux-testkit';
import Action from "../../../state/Action";

let state = {
    sources: {
        data: [{
            name: "Pro studenty geomatiky",
            channelLink: "http://prostudenty.blogspot.com/",
            type: "blog",
            items: [{
                title: "Twitter",
                link: "http://prostudenty.blogspot.com/2018/07/twitter_2.html",
                date: "2018-07-02T06:46:21.352Z"
            }, {
                title: "Twitter",
                link: "http://prostudenty.blogspot.com/2018/05/twitter_30.html",
                date: "2018-05-30T08:36:15.180Z"
            }]
        },{
            name: "ACP",
            channelLink: "http://acposta.cz/",
            type: "web",
            items: [{
                title: "AAA",
                date: "2018-07-05T06:46:21.352Z"
            }, {
                title: "BBB",
                date: "2018-05-01T08:36:15.180Z"
            }]
        }]
    }
};

describe('Sources selectors', () => {
    it('should select all data from sources', () => {
        Selector(Select.sources.getData).expect(state).toReturn(state.sources.data);
    });
    it('should select all records extended by data from channel', () => {
        let extendedRecords = [{
            name: "Pro studenty geomatiky",
            channelLink: "http://prostudenty.blogspot.com/",
            type: "blog",
            title: "Twitter",
            link: "http://prostudenty.blogspot.com/2018/07/twitter_2.html",
            date: "2018-07-02T06:46:21.352Z"
        },{
            name: "Pro studenty geomatiky",
            channelLink: "http://prostudenty.blogspot.com/",
            type: "blog",
            title: "Twitter",
            link: "http://prostudenty.blogspot.com/2018/05/twitter_30.html",
            date: "2018-05-30T08:36:15.180Z"
        },{
            name: "ACP",
            channelLink: "http://acposta.cz/",
            type: "web",
            title: "AAA",
            date: "2018-07-05T06:46:21.352Z"
        },{
            name: "ACP",
            channelLink: "http://acposta.cz/",
            type: "web",
            title: "BBB",
            date: "2018-05-01T08:36:15.180Z"
        }];
        Selector(Select.sources.getAllExtendedRecords).expect(state).toReturn(extendedRecords);
    });
    it('should select all records sorted by date', () => {
        let firstRecord = {
            name: "ACP",
            channelLink: "http://acposta.cz/",
            type: "web",
            title: "AAA",
            date: "2018-07-05T06:46:21.352Z"
        };
        let result = Selector(Select.sources.getAllExtendedRecordsSorted).execute(state);
        expect(result[0]).toMatchObject(firstRecord);
    });
});