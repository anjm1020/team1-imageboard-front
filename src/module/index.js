import {combineReducers} from "redux";
import {all} from "redux-saga/effects";
import post from "./post";
import postList from "./postlist";
import user,{userSaga} from "./user";

export function* rootSaga() {
    yield all([userSaga()]);
}

export default combineReducers({
    post,
    postList,
    user
});