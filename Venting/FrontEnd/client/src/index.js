
//IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer/reducer';

//ROUTER SETUP
const AppWithRouter = withRouter( App );
const store = createStore( reducer , applyMiddleware( thunk , logger ));


ReactDOM.render(

    <Provider store = { store }>
        <Router>
            <AppWithRouter />
        </Router>
    </Provider>

, document.getElementById('root'));
