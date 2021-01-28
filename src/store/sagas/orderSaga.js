import { put } from 'redux-saga/effects'

import * as Actions from "../actions/index";
import axiosInstance from "../../axios-orders";

export function* postOrderSaga(action) {
    yield put(Actions.purchaseStart());
    try {
        const res = yield axiosInstance.post('/orders.json?auth=' + action.token, action.data);
        yield put(Actions.setOrder(res.data.name, action.data));
    } catch(err) {
        yield put(Actions.setOrderFail(err));
    }
}


export function* fetchOrdersSaga(action) {
    yield put(Actions.fetchOrdersStart());
    try {
        const query = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const res = yield axiosInstance.get('/orders.json' + query);
        let orders = [];
        for (let key in res.data) {
            orders.push({...res.data[key], id: key});
        }
        yield put(Actions.fetchOrdersSuccess(orders));
    } catch(err) {
        yield put(Actions.fetchOrdersFail(err));
    }
}