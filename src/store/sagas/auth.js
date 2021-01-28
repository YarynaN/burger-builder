import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as Actions from "../actions/index";

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield put(Actions.logOutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(Actions.logOut());
}

export function* authUserSaga(action) {
    yield put(Actions.authStart());
    const authData = {email: action.email,
        password: action.password,
        returnSecureToken: true};
    const url = action.isSignUp ?
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDf8Ps2NZMLvdGZJlMpQrT4hoD9UY_oeS0' :
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDf8Ps2NZMLvdGZJlMpQrT4hoD9UY_oeS0';
    try {
        const res = yield axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        yield put(Actions.authSuccess(res.data));
        yield put(Actions.checkAuthTimeout(res.data.expiresIn))
    } catch (err) {
        yield put(Actions.authFailed(err.response.data.error));
    }
}

export function* reauthoriseSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(Actions.logOut());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            try {
                const response = yield axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDf8Ps2NZMLvdGZJlMpQrT4hoD9UY_oeS0', {idToken: token});
                yield put(Actions.authSuccess({...response.data.users[0], idToken: token}));
                yield put(Actions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            } catch(err){
                console.log(err);
            }
        } else {
            yield put(Actions.logOut());
        }

    }
}