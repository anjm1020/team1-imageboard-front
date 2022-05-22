import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginCheck} from "./module/user";
import {useNavigate} from "react-router";

import * as Auth from "./pages/auth";
import * as Post from "./pages/post";
import NotFound from "./pages/error/NotFound";
import './App.css';

function App() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(({user}) => user.user);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");

        if (!username) {
            dispatch(loginCheck(token));
            navigate("/login");
        }
        // local storage가 지워지는 속도와 memory가 지워지는 속도가 달라서 반짝거림 생김

    }, [navigate, username]);

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Auth.Login/>}></Route>
                <Route path="/register" element={<Auth.Register/>}></Route>
                <Route path="/create" element={<Post.Create/>}></Route>
                <Route path="/update" element={<Post.Update/>}></Route>
                <Route path="/item" element={<Post.Item/>}></Route>
                <Route path="/" element={<Post.List/>}/>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
