import {Routes, Route} from "react-router-dom";

import Auth from "./route/auth";
import Post from "./route/post";
import NotFound from "./pages/error/NotFound";
import './App.css';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/auth/*" element={<Auth/>}></Route>
                <Route path="/" element={<Post/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>}>
            </Routes>
        </div>
    );
}

export default App;
