import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Page from './components/containers/Page'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './state/Store';

ReactDOM.render(<Provider store={store}><Page/></Provider>,document.getElementById('root'));

registerServiceWorker();
