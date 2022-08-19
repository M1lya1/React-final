
import React from 'react';
import './App.css';
import CLoginForm from './components/LoginForm';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { Route, Router,  Routes, Navigate } from 'react-router-dom';
import CRegistrationForm from './components/Registration';
import CHeader from './components/Header';
import CContainer from './components/Container';
import CProfile from './components/Profile';
import CCardPage from './components/CardPage';
import Content from './components/Navigate'
import { createBrowserHistory } from "history";



export const history = createBrowserHistory();

store.subscribe(() => console.log(store.getState()))
function App() {
  return (
    <Router history={history}>
    <Provider store={store}>
    <div className="App">
      <CHeader/>
      <Content/>
        {/* <Routes> */}
          {/* <Route path='/login' element={<CLoginForm/>}/> */}
          {/* <Route path='/Registration' element={<CRegistrationForm/>}/> */}
          {/* <Route path='/profile' element={CProfile}/>
          <Route path='/profile/:_id' element={CProfile}/>
          <Route path='/main' element={<CContainer/>}/>
          <Route path='/main/:_id' element={<CCardPage/>}/>
          <Route path='/createCard' element={<></>}/>
          <Route path='/editCard/:id' element={<></>}/> */}
          {/* <Route path='/' element={<Navigate to='/main'/>}/> */}
          {/* <Navigate from='/' to='/main'/> */}
       {/* </Routes> */}

    </div>
    </Provider>
    </Router>
  );
}

export default App;
