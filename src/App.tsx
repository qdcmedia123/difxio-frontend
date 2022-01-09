import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from 'components/Auth/Signin';
import Signup from 'components/Auth/Signup';
import Film from 'components/Film/Film.index'
import FilmById from 'components/Film/Film.show';
import { Provider } from 'react-redux';
import { store, ActionTypes } from './state';
import Header from 'components/Common/header';
import Cookies from 'js-cookie';
import './App.css';

const expressSessCookie = Cookies.get('session');

if (expressSessCookie) {
  store.dispatch({
    type: ActionTypes.authUser,
    payload: {
      isAuthenticated: true,
      token: expressSessCookie
    }
  })
}


function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/film" element={<Film />} />
          <Route path="/film/:id" element={<FilmById />} />
         

        </Routes>
      </div>
    </Provider>
  );
}
export default App;
