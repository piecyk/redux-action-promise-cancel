import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import App from './containers/App'
import configureStore from './configureStore'

const store = configureStore({query: ''});

const el = document.createElement('div');
document.body.appendChild(el);


render(<Provider store={store}><App /></Provider>, el);
