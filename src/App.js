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
