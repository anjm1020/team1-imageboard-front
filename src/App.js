import {Routes, Route} from "react-router-dom";

import Auth from "./route/auth";
import Post from "./route/post";
import Bridge from "./route/bridge";
import NotFound from "./pages/error/NotFound";
import './App.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {loginCheck} from "./module/user";

function App() {

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
        <div className="App">
            <Routes>
                <Route path="/auth/*" element={<Auth/>}></Route>
                <Route path="/post/*" element={<Post/>}></Route>
                <Route path="/" element={<Bridge/>}></Route>
                <Route path="*" element={<NotFound at="home"/>}></Route>}>
            </Routes>
        </div>
    );
}

export default App;
