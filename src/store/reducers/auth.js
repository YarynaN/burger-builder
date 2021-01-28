import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirect: "/"
};

const authStart = (state) => {
    return updateObject(state, {loading: true, error: null});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        token: action.payload.data.idToken,
        userId: action.payload.data.localId,
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {loading: false, error: action.payload.error});
}

const authLogout = (state, action) => {
    return updateObject(state, {loading: false, error: null, token: null, userId: null});
}

const setAuthRedirect = (state, action) => {
    return updateObject(state, {redirect: action.payload.path});
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOG_OUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state, action);
        default: return state;
    }

}

export default reducer;