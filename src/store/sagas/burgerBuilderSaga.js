import { put } from 'redux-saga/effects';

import * as Actions from "../actions/index";
import axiosInstance from "../../axios-orders";

export function* initIngredientsSaga(action) {
    try {
        const res = yield axiosInstance.get('/ingredients.json');
        yield put(Actions.setIngredients(res.data));
    } catch(err) {
        yield put(Actions.fetchIngredientsFailed());
    }
}