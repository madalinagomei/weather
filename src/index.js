import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { Provider } from 'react-redux';
import './index.css'

import { store } from './redux/configStore'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
