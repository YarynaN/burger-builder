import { takeEvery, all, takeLatest} from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, reauthoriseSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilderSaga';
import { postOrderSaga, fetchOrdersSaga } from './orderSaga';
import * as ActionsTypes from '../actions/actionTypes'

export function* watchAuth() {
    yield all([
        takeEvery(ActionsTypes.AUTH_INITIATE_LOG_OUT, logoutSaga),
        takeEvery(ActionsTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(ActionsTypes.AUTH_INITIATE_AUTH, authUserSaga),
        takeEvery(ActionsTypes.AUTH_REAUTHORIZE, reauthoriseSaga),
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(ActionsTypes.GET_INGREDIENTS, initIngredientsSaga)
}
export function* watchOrders() {
    yield takeLatest(ActionsTypes.POST_ORDER_INTEND, postOrderSaga)
    yield takeEvery(ActionsTypes.FETCH_ORDERS_INTEND, fetchOrdersSaga)
}
