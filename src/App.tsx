import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from 'components/Auth/Login';
import Signup from 'components/Auth/Signup';
import Film from 'components/Film'
import FilmById from 'components/Film/id/Index';
import { Provider } from 'react-redux';
import { store } from './state';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route  path="/signup" element={<Signup />} />
          <Route path="/film" element={<Film />} />
          <Route path="/film/:id" element={<FilmById />} />
          
        </Routes>
      </div>
    </Provider>
  );
}
export default App;
