import {useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch,useSelector} from "react-redux";

import * as Auth from "../pages/auth";
import NotFound from "../pages/error/NotFound";
import {loginCheck} from "../module/user";

export default () => {

    const dispatch = useDispatch();


    return (
        <Routes>
            <Route path="/login" element={<Auth.Login/>}></Route>
            <Route path="/register" element={<Auth.Register/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    );
}