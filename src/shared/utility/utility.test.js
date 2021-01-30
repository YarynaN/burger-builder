import { configure } from 'enzyme';
import ReactSeventeenAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import { updateObject } from './utility';

configure({adapter: new ReactSeventeenAdapter});

describe('updateObject', () => {
    it('should return updated object', function () {
        expect(updateObject({'a': 'a'}, {'b': 'b'})).toEqual({
                'a': 'a',
                'b': 'b'
        })
    });
})