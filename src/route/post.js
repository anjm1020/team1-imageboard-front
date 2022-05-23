import {Routes,Route} from "react-router-dom";
import * as Post from "../pages/post";

export default () => {
    return (
        <>
            <Routes>
                <Route path="/create/:id" element={<Post.Create/>}></Route>
                <Route path="/update/:id" element={<Post.Update/>}></Route>
                <Route path="/read/:id" element={<Post.Item/>}></Route>
                <Route path="" element={<Post.List/>}/>
            </Routes>
        </>
    );
}