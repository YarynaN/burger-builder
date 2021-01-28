import * as ActionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START,
    }
}

export const authSuccess = (data) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const authFailed = (err) => {
    return {
        type: ActionTypes.AUTH_FAILED,
        payload: {
            error: err
        }
    }
}

export const authInitiated = (email, password, isSignUp) => {
    return {
        type: ActionTypes.AUTH_INITIATE_AUTH,
        password: password,
        email: email,
        isSignUp: isSignUp
    }
}

export const logOut = () => {
    return {
        type: ActionTypes.AUTH_INITIATE_LOG_OUT
    };
}

export const logOutSucceed = () => {
    return {
        type: ActionTypes.AUTH_LOG_OUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: ActionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: ActionTypes.SET_AUTH_REDIRECT,
        payload: {
            path: path
        }
    }
}

export const authCheckState = () => {
    return {
        type: ActionTypes.AUTH_REAUTHORIZE
    }
}