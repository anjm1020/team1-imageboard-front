import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {User as API} from "./api";


const USER_LOGIN = "USER/LOGIN";
const USER_LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
const USER_LOGIN_FAILURE = "USER/LOGIN_FAILURE";

const USER_LOGIN_CHECK = "USER/LOGIN_CHECK";
const USER_LOGIN_CHECK_SUCCESS = "USER/LOGIN_CHECK_SUCCESS";
const USER_LOGIN_CHECK_FAILURE = "USER/LOGIN_CHECK_FAILURE";

const USER_REGISTER = "USER/REGISTER";
const USER_REGISTER_SUCCESS = "USER/REGISTER_SUCCESS";
const USER_REGISTER_FAILURE = "USER/REGISTER_FAILURE";

const USER_LOGOUT = "USER/LOGOUT";
const USER_LOGOUT_SUCCESS = "USER/LOGOUT_SUCCESS";

const USER_INIT = "USER/INIT";

export const login = createAction(USER_LOGIN, user => user); // saga
export const loginCheck = createAction(USER_LOGIN_CHECK);
export const register = createAction(USER_REGISTER, user => user); // saga
export const logout = createAction(USER_LOGOUT);
export const initialize = createAction(USER_INIT);

function* loginSaga({payload: form}) {
    try {
        // api call
        const res = yield call(API.login, form);
        const {data, token} = {
            data: res.data,
            token: res.headers["authorization"]
        };
        window.localStorage.setItem("token", token);
        yield put({
            type: USER_LOGIN_SUCCESS,
            payload: {
                userId: data.result.id,
                username: data.result.username,
            }
        });
    } catch (err) {
        yield put({type: USER_LOGIN_FAILURE, payload: err})
    }
}

function* registerSaga({payload: form}) {

    try {
        // api call
        const {data} = yield call(API.register, form);
        yield put({
            type: USER_REGISTER_SUCCESS, payload: {
                userId: data.result.id,
                username: data.result.username,
            }
        });
        yield put({type: USER_REGISTER_SUCCESS});
    } catch (err) {
        console.log(err);
        yield put({type: USER_REGISTER_FAILURE, payload: err});
    }
}

function* loginCheckSaga() {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const res = yield call(API.getUser, token);
            const {data} = res;
            yield put({
                type: USER_LOGIN_CHECK_SUCCESS,
                payload: {
                    userId: data.result.id,
                    username: data.result.username
                }
            })
        } catch (err) {
            yield put({
                type: USER_LOGIN_CHECK_FAILURE,
                payload: err,
            });
        }
    }
}

function* logoutSaga(){
    yield window.localStorage.removeItem("token");
    yield put({type: USER_LOGOUT_SUCCESS});
}

export function* userSaga() {
    yield takeLatest(USER_REGISTER, registerSaga);
    yield takeLatest(USER_LOGIN, loginSaga);
    yield takeLatest([USER_LOGIN_CHECK,USER_LOGIN_SUCCESS], loginCheckSaga);
    yield takeLatest(USER_LOGOUT, logoutSaga);
}

const initState = {
    user: null,
    userId: null,
    login: {
        email: "",
        password: "",
        errMsg: null,
    },
    form: {
        email: "",
        username: "",
        password: ""
    },
    isRegisterSuccess:false,
};


export default handleActions({
    [USER_LOGIN_SUCCESS]: (state, {payload}) => ({
        ...state,
        login : {
            email: "",
            password: "",
            errMsg: null,
        }
    }),
    [USER_LOGIN_FAILURE]: (state, action) => ({
        ...state,
        login : {
            ...state.login,
            errMsg: "Login Failed",
        }
    }),
    [USER_LOGIN_CHECK_SUCCESS]: (state, {payload}) => ({
        ...state,
        user: payload.username,
        userId: payload.userId,
    }),
    [USER_LOGIN_CHECK_FAILURE]: (state, {payload}) => ({
        ...state,
    }),
    [USER_REGISTER_SUCCESS]: (state, action) => ({
        ...state,
        isRegisterSuccess:true,
    }),
    [USER_LOGOUT_SUCCESS]: (state, action) => ({
        ...state,
        user: null,
        userId: null
    })
    ,
    [USER_INIT]: (state, action) => ({
        ...state,
        login: initState.login,
        form: initState.form,
    })
}, initState);

