import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {store} from './Redux/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profiles from './Components/Profiles/Profiles';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
   <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}  exact />
      <Route path="profiles" element={<Profiles />} />

    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
