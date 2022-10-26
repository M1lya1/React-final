
import React from 'react';
import './App.css';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { Route, Router,  Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Navigate'
import { createBrowserHistory } from "history";



 const history = createBrowserHistory();

 store.subscribe(() => console.log(store.getState()))
function App() {
  return (
    <Router history={history}>
    <Provider store={store}>
    <div className="App">
      <Header/>
      <Content/>
        

    </div>
    </Provider>
    </Router>
  );
}

export  {App, history};
