import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Organizations from './Components/Organizations/Organizations';
import  Vendors  from './Components/Vendors/Vendors';
import Home from './Components/Home/Home';

function App() {  
return (
  <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Home/>}>
          <Route path="organization" element={<Organizations />} />
          <Route path='vendors' element={<Vendors />} />
            </Route>
        </Routes>
    </BrowserRouter>

{/* <BankDetails/> */}


  </div>
);
};
export default App;