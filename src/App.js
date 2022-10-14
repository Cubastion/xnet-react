import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Organizations from './Components/Organizations/Organizations';
import Home from './Components/Home/Home';
import {config } from "./Components/Config/Config";
import { PublicClientApplication } from '@azure/msal-browser';

function App() {  
return (
  <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Home/>}>
            <Route path="organization" element={<Organizations/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    
  </div>
);
};
export default App;