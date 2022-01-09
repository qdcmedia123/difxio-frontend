import Login from 'components/Auth/Signin';
import Signup from 'components/Auth/Signup';
import Header from 'components/Common/header';
import Film from 'components/Film/Film.index';
import FilmById from 'components/Film/Film.show';
import Cookies from 'js-cookie';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { ActionTypes, store } from './state';
import './scss/main.scss';
import './App.scss';


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
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/film" element={<Film />} />
            <Route path="/film/:id" element={<FilmById />} />
          </Routes>
        </div>

      </div>
    </Provider>
  );
}
export default App;
