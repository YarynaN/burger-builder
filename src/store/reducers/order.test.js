import reducer from "./order";
import * as ActionTypes from '../actions/actionTypes';

describe('order reducer', () => {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            orders: [],
            purchased: false
        })
    });

    it('should have order upon fetch', function () {
        expect(reducer({
            loading: false,
            orders: [],
            purchased: false
        }, {
            type: ActionTypes.FETCH_ORDERS_SUCCESS,
            payload: {
                orderData: [{
                    'some-id': {
                        'smth': 'smth'
                    },
                    id: 'some-id'
                }]
            }
        })
        ).toEqual({
            loading: false,
            orders: [{
                'some-id': {
                    'smth': 'smth'
                },
                id: 'some-id'
            }],
            purchased: false
        })
    });

    it('should start loading', function () {
        expect(reducer(undefined, { type: ActionTypes.FETCH_ORDERS_START })).toEqual({
            loading: true,
            orders: [],
            purchased: false
        })
    });
})