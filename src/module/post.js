import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {Post as API} from "./api";

// post read
const LOAD_POST = "POST/LOAD_POST";
const LOAD_POST_SUCCESS = "POST/LOAD_POST_SUCCESS";
const LOAD_POST_FAILURE = "POST/LOAD_POST_FAILURE";

// post create, update
const CREATE_POST = "POST/CREATE_POST";
const CREATE_POST_SUCCESS = "POST/CREATE_POST_SUCCESS";
const CREATE_POST_FAILURE = "POST/CREATE_POST_FAILURE";

const UPDATE_POST = "POST/UPDATE_POST";
const UPDATE_POST_SUCCESS = "POST/UPDATE_POST_SUCCESS";
const UPDATE_POST_FAILURE = "POST/UPDATE_POST_FAILURE";

const DELETE_POST = "POST/DELETE_POST";
const DELETE_POST_SUCCESS = "POST/DELETE_POST_SUCCESS";
const DELETE_POST_FAILURE = "POST/DELETE_POST_FAILURE";

export const loadPost = createAction(LOAD_POST, postId => postId); //saga
export const createPost = createAction(CREATE_POST, post => post); //saga
export const updatePost = createAction(UPDATE_POST, post => post);
export const deletePost = createAction(DELETE_POST, postId => postId);

function* loadPostSaga({payload: postId}) {
    const token = localStorage.getItem("token");
    try {
        const {data} = yield call(API.getPost, {token, postId});
        console.log(data);
        yield put({type: LOAD_POST_SUCCESS, payload: data});
    } catch (err) {
        yield put({type: LOAD_POST_FAILURE, payload: err});
    }
}

function* createPostSaga({payload: post}) {
    const token = localStorage.getItem("token");
    try {
        const data = yield call(API.createPost, {token, post});
    } catch (err) {

    }
}

function* updatePostSaga({payload: post}) {
    const token = localStorage.getItem("token");
    try {
        console.log(post);
        const data = yield call(API.updatePost, {token, post});
        console.log(data);
    } catch (err) {

    }
}

function* deletePostSaga({payload: postId}) {
    const token = localStorage.getItem("token");
    try {
        const data = yield call(API.deletePost, {token, postId});
        console.log(data);
    } catch (err) {

    }
}


export function* postSaga() {
    yield takeLatest(LOAD_POST, loadPostSaga);
    yield takeLatest(CREATE_POST, createPostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
    yield takeLatest(DELETE_POST, deletePostSaga);
}

const initState = {
    id: null,
    userId: null,
    title: "",
    content: "",
    imgId: null,
    err : {
        load : false,
    }
}

export default handleActions({
    [LOAD_POST_SUCCESS]: (state, {payload}) => ({
        ...state,
        userId: payload.userId,
        imgId: payload.imgId,
        content: payload.content,
        title: payload.title
    }),
    [LOAD_POST_FAILURE] : (state) => ({
        ...state,
        err: {
            ...state.err,
            load: true
        },
    })
}, initState);
