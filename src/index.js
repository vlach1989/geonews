import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Loader from './components/containers/Loader'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './state/Store';

ReactDOM.render(<Provider store={store}><Loader/></Provider>,document.getElementById('root'));

registerServiceWorker();
