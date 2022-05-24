import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';

// 라우팅
import {BrowserRouter} from "react-router-dom";

// Redux store
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension"; // dev-tools
import rootReducer,{rootSaga} from "./module/reducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(
    sagaMiddleware,
)));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
