import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {Post as API} from "./api";
import data from "bootstrap/js/src/dom/data";

const LOAD_LIST = "POST_LIST/LOAD";
const LOAD_LIST_SUCCESS = "POST_LIST/LOAD_SUCCESS";
const LOAD_LIST_FAILURE = "POST_LIST/LOAD_FAILURE";

export const loadList = createAction(LOAD_LIST, pageNumber => pageNumber); // saga

function* loadListSaga({payload:pageNumber}) {
    const token = localStorage.getItem("token");
    try {
        const {data} = yield call(API.getList, {token, pageNumber});
        yield put({type: LOAD_LIST_SUCCESS, payload: data});
    } catch (err) {
        yield put({type: LOAD_LIST_FAILURE, payload: err});
    }
}

export function* postListSaga() {
    yield takeLatest(LOAD_LIST, loadListSaga);
}

const initState = {
    list: [],
    pageNumber:0,
};

export default handleActions({
    [LOAD_LIST_SUCCESS]:(state,{payload: data}) => ({
        ...state,
        list : data
    })
}, initState);

