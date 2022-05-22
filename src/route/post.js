import {Routes,Route} from "react-router-dom";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {loginCheck} from "../module/user";
import * as Post from "../pages/post";

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
            navigate("/auth/login");
        }
        // local storage가 지워지는 속도와 memory가 지워지는 속도가 달라서 반짝거림 생김

    }, [navigate, username]);
    return (
        <>
            <Routes>
                <Route path="/create" element={<Post.Create/>}></Route>
                <Route path="/update" element={<Post.Update/>}></Route>
                <Route path="/item" element={<Post.Item/>}></Route>
                <Route path="/" element={<Post.List/>}/>
            </Routes>
        </>
    );
}