import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {Post as API} from "../api";
import {EMIT_ERROR} from "./error";
import exceptionBuilder from "../lib/exception/exceptionBuilder";
// post read
const LOAD_POST = "POST/LOAD_POST";
const LOAD_POST_SUCCESS = "POST/LOAD_POST_SUCCESS";

// post create, update
const CREATE_POST = "POST/CREATE_POST";
const UPDATE_POST = "POST/UPDATE_POST";
const DELETE_POST = "POST/DELETE_POST";

// image download
const IMAGE_DOWNLOAD = "POST/IMAGE_DOWNLOAD";
const IMAGE_DOWNLOAD_SUCCESS = "POST/IMAGE_DOWNLOAD_SUCCESS";

export const loadPost = createAction(LOAD_POST, postId => postId); //saga
export const createPost = createAction(CREATE_POST, post => post); //saga
export const updatePost = createAction(UPDATE_POST, post => post);
export const deletePost = createAction(DELETE_POST, postId => postId);
export const imageDownload = createAction(IMAGE_DOWNLOAD, imageId => imageId);

function* loadPostSaga({payload: postId}) {
    const token = localStorage.getItem("token");
    try {
        const {data} = yield call(API.getPost, {token, postId});
        yield put({type: LOAD_POST_SUCCESS, payload: data});
    } catch (err) {
        yield put({type: EMIT_ERROR, payload: exceptionBuilder(err.response)});
    }
}

function* createPostSaga({payload: post}) {
    const token = localStorage.getItem("token");
    try {
        yield call(API.createPost, {token, post});
    } catch (err) {
        // FORM ERROR
    }
}

function* updatePostSaga({payload: post}) {
    const token = localStorage.getItem("token");
    try {
        console.log(post);
        const data = yield call(API.updatePost, {token, post});
        console.log(data);
    } catch (err) {
        // FORM ERROR
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

function* imageDownloadSaga({payload: imageId}) {
    const token = localStorage.getItem("token");
    try {
        const data = yield call(API.downloadImage, {token, imageId});
        console.log("downloadImage/data : " + data);
        yield put({type : IMAGE_DOWNLOAD_SUCCESS, payload: data});
    } catch (err) {

    }
}


export function* postSaga() {
    yield takeLatest(LOAD_POST, loadPostSaga);
    yield takeLatest(CREATE_POST, createPostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
    yield takeLatest(DELETE_POST, deletePostSaga);
    yield takeLatest(IMAGE_DOWNLOAD, imageDownloadSaga);
}

const initState = {
    id: null,
    userId: null,
    title: "",
    content: "",
    imgId: null,
}

export default handleActions({
    [LOAD_POST_SUCCESS]: (state, {payload}) => ({
        ...state,
        userId: payload.userId,
        imgId: payload.imgId,
        content: payload.content,
        title: payload.title
    }),
    [IMAGE_DOWNLOAD_SUCCESS]: (state) => ({
        ...state,
    }),
}, initState);
