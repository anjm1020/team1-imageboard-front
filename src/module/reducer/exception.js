import {createAction, handleActions} from "redux-actions";

export const EMIT_ERROR = "ERROR/EMIT_ERROR";
const CLEAR_ERROR = "ERROR/CLEAR_ERROR";

export const emitError = createAction(EMIT_ERROR, body => body);
export const clearError = createAction(CLEAR_ERROR);

const initState = {
    body : null,
}

export default handleActions({
    [EMIT_ERROR]: (state, {payload: body}) => ({
        ...state,
        body,
    }),
    [CLEAR_ERROR]: (state, action) => ({
        ...state,
        data: null
    }),
}, initState);