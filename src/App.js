import './App.css';
import SideNavbar from './Components/Side-NavBar/SideNavbar';
import SideNavElement from "./Components/Side-NavBar/SideNavElement.json";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Organizations from './Components/Organizations/Organizations';
import Login from './Components/Login/Login';


function App() {
  
    
  

 


return (
  <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path="" element={<Login/>}/>
            {/* <Route path="/sideNavBar" element={<SideNavbar/>}/> */}
            <Route path="/organization" element={<Organizations/>}/>
        </Routes>    
    </BrowserRouter>
  </div>
);
};
export default App;