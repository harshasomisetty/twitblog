import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Author from './routes/author'
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/author" element={<Author />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

