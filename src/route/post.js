import {Routes, Route} from "react-router-dom";
import * as Post from "../pages/post";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loginCheck} from "../module/user";

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(({user}) => user.user);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/auth/login");
        }

        if (!username) {
            dispatch(loginCheck(token));
        }
        // local storage가 지워지는 속도와 memory가 지워지는 속도가 달라서 반짝거림 생김

    }, [navigate, username]);

    return (
        <>
            <Routes>
                <Route path="/create" element={<Post.Create/>}></Route>
                <Route path="/update/:id" element={<Post.Update/>}></Route>
                <Route path="/read/:id" element={<Post.Item/>}></Route>
                <Route path="" element={<Post.List/>}/>
            </Routes>
        </>
    );
}
