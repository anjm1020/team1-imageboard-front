import {Routes, Route} from "react-router-dom";

import Auth from "./route/auth";
import Post from "./route/post";
import Bridge from "./route/bridge";

import Error from "./pages/error";
import NotFound from "./pages/error/NotFound";
import './App.css';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {

    const navigate = useNavigate();
    const body = useSelector(({exception}) => exception.body);

    useEffect(() => {
        if (body) {
            navigate("/error");
        }
    }, [body]);

    return (
        <div className="App">
            <Routes>
                <Route path="/auth/*" element={<Auth/>}></Route>
                <Route path="/post/*" element={<Post/>}></Route>
                <Route path="/error" element={<Error/>}></Route>
                <Route path="/" element={<Bridge/>}></Route>
                <Route path="*" element={<NotFound at="home"/>}></Route>}>
            </Routes>
        </div>
    );
}

export default App;
