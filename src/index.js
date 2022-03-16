import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './css/base.scss';
import App from './components/App';
import configureStore from './store/configureStore';

const store = configureStore();

const rootElement = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
);
