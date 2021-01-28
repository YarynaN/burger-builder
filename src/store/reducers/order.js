import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility/utility';

const initialState = {
    loading: false,
    orders: [],
    purchased: false
};

const postOrderStart = (state) => {
    return updateObject(state, { loading: true })
}

const postOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat({...action.payload.orderData, id: action.payload.id}),
        purchased: true
    })
}

const postOrderFailed = (state) => {
    return updateObject(state, { loading: false })
}

const purchaseInit = (state) => {
    return updateObject(state, { purchased: false })
}

const fetchOrderStart = (state) => {
    return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.payload.orderData,
        loading: false,
    })
}

const fetchOrderFailed = (state) => {
    return updateObject(state, { loading: false })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.POST_ORDER_START: return postOrderStart(state);
        case ActionTypes.POST_ORDER_SUCCESS: return postOrderSuccess(state, action);
        case ActionTypes.POST_ORDER_FAIL: return postOrderFailed(state);
        case ActionTypes.PURCHASE_INIT: return purchaseInit(state);
        case ActionTypes.FETCH_ORDERS_START: return fetchOrderStart(state);
        case ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
        case ActionTypes.FETCH_ORDERS_FAIL: return fetchOrderFailed(state)
        default: return state;
    }
}

export default reducer;