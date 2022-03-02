import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Preloader} from "./components/common/Preloader/Preloader";

const renderEntireTree = () => {
    ReactDOM.render(
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <React.Suspense fallback={<Preloader/>}> <App/></React.Suspense>
            </Provider>
        </HashRouter>,
        document.getElementById('root')
    );
}

renderEntireTree ()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
