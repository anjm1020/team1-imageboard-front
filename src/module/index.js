import {combineReducers} from "redux";
import {all} from "redux-saga/effects";
import post,{postSaga} from "./post";
import postList, {postListSaga} from "./postlist";
import user,{userSaga} from "./user";

export function* rootSaga() {
    yield all([userSaga(),postListSaga(),postSaga()]);
}

export default combineReducers({
    post,
    postList,
    user
});