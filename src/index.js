import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/authReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const reducer = combineReducers({ auth: authReducer }); // Using Combine Reducers here although only one reducer is present.
// Official explaination here: https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-will-not-run-if-the-store-state-is-the-same
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // The first one is to make the chrome dev extension work
const store = createStore(reducer, composeEnhanced(applyMiddleware(thunk))); // We are using thunk, because it allows delaying the dispatch actions
// Thunk wraps the dispatch actions into custom functions which are available with the mapDispatchToProps

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
