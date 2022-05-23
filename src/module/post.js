import {createAction, handleActions} from "redux-actions";
import {put, call, takeLatest} from "redux-saga/effects";

import {Post as API} from "./api";

// post read
const LOAD_POST = "POST/READ/LOAD_POST";
const LOAD_POST_SUCCESS = "POST/READ/LOAD_POST_SUCCESS";
const LOAD_POST_FAILURE = "POST/READ/LOAD_POST_FAILURE";

// post create, update
const CLEAR_FORM = "POST/FORM/CLEAR_FORM";
const SEND_FORM = "POST/FORM/SEND_FORM";
const SEND_FORM_SUCCESS = "POST/FORM/SEND_FORM_SUCCESS";
const SEND_FORM_FAILURE = "POST/FORM/SEND_FORM_SUCCESS";

export const loadPost = createAction(LOAD_POST, postId => postId); //saga

export const clearForm = createAction(CLEAR_FORM);
export const sendForm = createAction(SEND_FORM, post => post); //saga

function* loadPostSaga({payload:postId}) {
    const token = localStorage.getItem("token");
    try{
        const {data} = yield call(API.getPost, {token, postId});
        console.log(data);
        yield put({type:LOAD_POST_SUCCESS, payload: data});
    } catch (err) {
        yield put({type:LOAD_POST_FAILURE, payload: err});
    }
}

export function* postSaga(){
    yield takeLatest(LOAD_POST, loadPostSaga);
}

const initState = {
    read : {
        userId : null,
        title : "",
        content : "",
        imgId : null
    },
    form : {
        userId : null,
        title : "",
        content : "",
        imgFile : null
    }
}

export default handleActions({
    [LOAD_POST_SUCCESS]: (state,{payload})=>({
        ...state,
        read : {
            userId : payload.user_id,
            imgId : payload.img_id,
            content : payload.content,
            title : payload.title
        }
    }),
    [CLEAR_FORM]: (state,action) => ({
        form : initState.form,
        ...state,
    }),
}, initState);
