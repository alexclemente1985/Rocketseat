import React, { Component} from 'react';
import Routes from "./routes";
import Header from './components/Header';
//import api from './services/api';
import Main from './pages/main';
import "./styles.css";

const App =() => (
  <div className="App">
    <Header />
    <Routes />
    {/* <Main /> */}
  </div>
);


export default App;
