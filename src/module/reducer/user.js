import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {User as API} from "../api";


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
export const loginFail = createAction(USER_LOGIN_FAILURE, errMsg => errMsg);
export const loginCheck = createAction(USER_LOGIN_CHECK);
export const register = createAction(USER_REGISTER, user => user); // saga
export const registerFail = createAction(USER_REGISTER_FAILURE);
export const logout = createAction(USER_LOGOUT);

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
        yield put({type: USER_LOGIN_FAILURE, payload: "Login Failed"}) // response 받아서 변경
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
        yield put({type: USER_REGISTER_FAILURE, payload: "Register Failed"});
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

function* logoutSaga() {
    yield localStorage.removeItem("token");
    yield put({type: USER_LOGOUT_SUCCESS});
}

export function* userSaga() {
    yield takeLatest(USER_REGISTER, registerSaga);
    yield takeLatest(USER_LOGIN, loginSaga);
    yield takeLatest([USER_LOGIN_CHECK, USER_LOGIN_SUCCESS], loginCheckSaga);
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
        password: "",
        errMsg: null,
    },
    isRegisterSuccess: false,
};


export default handleActions({
        [USER_LOGIN_SUCCESS]: (state, {payload}) => ({
            ...state,
            login: initState.login,
        }),
        [USER_LOGIN_FAILURE]: (state, {payload: errMsg}) => ({
            ...state,
            login: {
                ...state.login,
                errMsg,
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
            isRegisterSuccess: true,
        }),
        [USER_REGISTER_FAILURE]: (state, {payload: errMsg}) => ({
            ...state,
            form: {
                ...state.form,
                errMsg
            }
        }),
        [USER_LOGOUT_SUCCESS]:
            (state, action) => ({
                ...state,
                user: null,
                userId: null
            })
        ,
        [USER_INIT]:
            (state, action) => ({
                ...state,
                login: initState.login,
                form: initState.form,
            })
    },
    initState
)
;

