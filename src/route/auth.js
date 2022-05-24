import {Routes,Route} from "react-router-dom";

import * as Auth from "../pages/auth";
import NotFound from "../pages/error/NotFound";

export default () => {

    return (
        <Routes>
            <Route path="/login" element={<Auth.Login/>}></Route>
            <Route path="/register" element={<Auth.Register/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    );
}