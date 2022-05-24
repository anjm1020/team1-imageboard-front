import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {Post as API} from "./api";
import data from "bootstrap/js/src/dom/data";

const LOAD_LIST = "POST_LIST/LOAD";
const LOAD_LIST_SUCCESS = "POST_LIST/LOAD_SUCCESS";
const LOAD_LIST_FAILURE = "POST_LIST/LOAD_FAILURE";

const LOAD_LENGTH = "POST_LIST/LOAD_LENGTH"
const LOAD_LENGTH_SUCCESS = "POST_LIST/LOAD_LENGTH_SUCCESS"
const LOAD_LENGTH_FAILURE = "POST_LIST/LOAD_LENGTH_FAILURE"

const SET_PAGE_NUMBER = "POST_LIST/SET_PAGE_NUMBER"

export const loadList = createAction(LOAD_LIST, pageNumber => pageNumber); // saga
export const loadLength = createAction(LOAD_LENGTH);
export const setPageNumber = createAction(SET_PAGE_NUMBER, pageNumber => pageNumber);

function* loadListSaga({payload: pageNumber}) {
    const token = localStorage.getItem("token");
    try {
        const {data} = yield call(API.getList, {token, pageNumber});
        yield put({type: LOAD_LIST_SUCCESS, payload: data});
    } catch (err) {
        yield put({type: LOAD_LIST_FAILURE, payload: err});
    }
}

function* loadLengthSaga() {
    const token = localStorage.getItem("token");
    try {
        const {data} = yield call(API.getLength, {token});
        yield put({type: LOAD_LENGTH_SUCCESS, payload: data});
    } catch (err) {
        yield put({type: LOAD_LENGTH_FAILURE, payload: err});
    }
}

export function* postListSaga() {
    yield takeLatest(LOAD_LIST, loadListSaga);
    yield takeLatest(LOAD_LENGTH, loadLengthSaga);
}

const initState = {
    list: [],
    pageNumber: 0,
    listLength: null,
};

export default handleActions({
    [LOAD_LIST_SUCCESS]: (state, {payload: data}) => ({
        ...state,
        list: data
    }),
    [LOAD_LENGTH_SUCCESS]: (state, {payload: listLength}) => ({
        ...state,
        listLength
    }),
    [SET_PAGE_NUMBER]: (state, {payload: pageNumber}) => ({
        ...state,
        pageNumber
    })
}, initState);

