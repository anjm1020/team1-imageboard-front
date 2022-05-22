import {createAction, handleActions} from "redux-actions";

const LOAD_LIST = "POST_LIST/LOAD";
const CLEAR_LIST = "POST_LIST/CLEAR";

export const loadList = createAction(LOAD_LIST, list => list); // saga
export const clearList = createAction(CLEAR_LIST);

const initState = {
    list: [],
};

export default handleActions({
    CLEAR_LIST : (state,payload) => ({
        list : initState.list,
        ...state,
    })
}, initState);

