import * as ActionTypes from './actionTypes';

export const setOrder = (id, orderData) => {
    return {
        type: ActionTypes.POST_ORDER_SUCCESS,
        payload: {
            id: id,
            orderData: orderData
        }
    };
}

export const setOrderFail = (err) => {
    return {
        type: ActionTypes.POST_ORDER_FAIL,
        err: err
    };
}

export const purchaseStart = () => {
    return {
        type: ActionTypes.POST_ORDER_START
    };
}

export const postOrder = (data, token) => {
    return {
        type: ActionTypes.POST_ORDER_INTEND,
        data: data,
        token: token
    }
}

export const purchaseInit = () => {
    return {
        type: ActionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersSuccess = (data) => {
    return {
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orderData: data
        }
    };
}

export const fetchOrdersFail = (err) => {
    return {
        type: ActionTypes.FETCH_ORDERS_FAIL,
        payload: {
            err: err
        }
    };
}

export const fetchOrdersStart = () => {
    return {
        type: ActionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = (token, userId) => {
    return {
        type: ActionTypes.FETCH_ORDERS_INTEND,
        token: token,
        userId: userId
    }
}