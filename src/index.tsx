import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import locale from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import {store} from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={locale}>
            <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
