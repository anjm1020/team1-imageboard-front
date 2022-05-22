import {Routes,Route} from "react-router-dom";
import * as Post from "../pages/post";

export default () => {
    return (
        <>
            <Routes>
                <Route path="create" element={<Post.Create/>}></Route>
                <Route path="update" element={<Post.Update/>}></Route>
                <Route path="item" element={<Post.Item/>}></Route>
                <Route path="" element={<Post.List/>}/>
            </Routes>
        </>
    );
}