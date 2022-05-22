import {createAction, handleActions} from "redux-actions";

// post read
const LOAD_POST = "POST/READ/LOAD_POST";
const CLEAR_POST = "POST/READ/CLEAR_POST";

export const loadPost = createAction(LOAD_POST, postId => postId); //saga
export const clearPost = createAction(CLEAR_POST);

// post create, update
const CLEAR_FORM = "POST/FORM/CLEAR_FORM";
const SEND_FORM = "POST/FORM/SEND_FORM";
const SEND_FORM_SUCCESS = "POST/FORM/SEND_FORM_SUCCESS";
const SEND_FORM_FAILURE = "POST/FORM/SEND_FORM_SUCCESS";

export const clearForm = createAction(CLEAR_FORM);
export const sendForm = createAction(SEND_FORM, post => post); //saga

const initState = {
    read : {
        userId : null,
        title : "",
        content : "",
        imgSrc : null
    },
    form : {
        userId : null,
        title : "",
        content : "",
        imgFile : null
    }
}

export default handleActions({
    [CLEAR_POST]: (state, action) => ({
        read: initState.read,
        ...state,
    }),
    [CLEAR_FORM]: (state,action) => ({
        form : initState.form,
        ...state,
    }),

}, initState);
