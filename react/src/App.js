import React from 'react';
import {Routes,Route} from "react-router-dom"
import './App.css';
// import Home from './components/Home';
// import Sample from './components/sample.js'
// import AboutUs from './components/AboutUs'
// import List from './components/list';
import Login from './components/Login';
import Dashboard from "./components/Dashboard"
// import Search from './components/Search';
import RequestSent from './components/RequestSent';
import Request from './components/Request';
import ADRR from './components/Adrr';
import DDRR from './components/Ddrr';
import DGRR from './components/Dgrr';
import Eventcheck from './components/Eventcheck';
import Register from './components/Register';
import Transportation from './components/Transportation';
import CheckStatus from './components/CheckStatus';
import ManufacturerRR from "./components/ManufacturerRR";
import Transactions from "./components/Transactions";
import ResetPassword from './components/ResetPassword';
function App() {
  return (
    
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/TransactionsHistory" element={<Transactions/>}/>
      <Route path="/ResetPassword" element={<ResetPassword/>}/>
      {/*
      <Route path="/:id/dgrr" element={<DGRR/>}/> */}
      <Route path="*" element={<Eventcheck/>} />
      <Route path="/:id" element={<Dashboard />}>
          <Route path="request" element={<Request />} />
          <Route path="adrr" element={<ADRR />} />
          <Route path="ddrr" element={<DDRR/>}/>
          <Route path="dgrr" element={<DGRR/>}/>
          <Route path="Register" element={<Register/>}/>
          <Route path="Transportation" element={<Transportation/>}/>
          <Route path="Transportation/:req_id" element={<CheckStatus/>}/>
          <Route path="requestSent" element={<RequestSent/>}/>
          <Route path='MRR' element={<ManufacturerRR/>}/>
      </Route>
      {/* <Route exact path="/Home" element={<Home/>} />
      <Route exact path="/aboutUS" element={<AboutUs/>} />
      <Route exact path="/l
      ogin" element={<Login/>} /> */}
    </Routes>
  );
}

export default App;
