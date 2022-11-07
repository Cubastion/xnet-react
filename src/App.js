import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Organizations from './Components/Organizations/Organizations';
import  Vendors  from './Components/Vendors/Vendors';
import Home from './Components/Home/Home';
import Budget from './Components/Budget/Budget';
import Clients from './Components/Clients/Clients';
import PurchaseOrders from './Components/PurchaseOrders/PurchaseOrders';
import MyPurchaseOrder from './Components/PurchaseOrders/MyPurchaseOrder';
import InternalPOL1 from './Components/PurchaseOrders/InternalPOL1';
import InternalPOL2 from './Components/PurchaseOrders/InternalPOL2';
import InternalPOAll from './Components/PurchaseOrders/InternalPOAll';
import InternalPO from './Components/PurchaseOrders/InternalPO';
function App() {  
return (
  <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Home/>}>
          <Route path="organization" element={<Organizations />} />
          <Route path="clients" element={<Clients />} />
          <Route path='vendors' element={<Vendors />} />
          <Route path='budget' element={<Budget/>} />
          <Route path='all-purchase' element={<PurchaseOrders/>}/>
          <Route path='my-purchase' element={<MyPurchaseOrder/>}/>
          <Route path='internal-po' element={<InternalPO/>}/>
          <Route path='internal-po-approval-level-1' element={<InternalPOL1/>}/>
          <Route path='internal-po-approval-level-2' element={<InternalPOL2/>}/>
          <Route path='internal-po-approval-level-all' element={<InternalPOAll/>}/>
            </Route>
        </Routes>
    </BrowserRouter>

{/* <BankDetails/> */}


  </div>
);
};
export default App;