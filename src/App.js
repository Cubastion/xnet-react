import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Organizations from "./Components/Organizations/Organizations";
import Vendors from "./Components/Vendors/Vendors";
import Home from "./Components/Home/Home";
import Budget from "./Components/Budget/Budget";
import Clients from "./Components/Clients/Clients";
import ClientDetails from "./Components/Clients/ClientsTable/ClientDetails/ClientDetails";
import PurchaseOrders from "./Components/PurchaseOrders/PurchaseOrders";
import MyPurchaseOrder from "./Components/PurchaseOrders/MyPurchaseOrder";
import EmployeeTable from "./Components/Staffing/EmployeeTable";
import InternalPOL1 from "./Components/PurchaseOrders/InternalPOL1";
import InternalPOL2 from "./Components/PurchaseOrders/InternalPOL2";
import InternalPOAll from "./Components/PurchaseOrders/InternalPOAll";
import InternalPO from "./Components/PurchaseOrders/InternalPO";
import AllInvoices from "./Components/Invoices/Invoices Table/AllInvoices";
import Invoices from "./Components/Invoices/Invoices Table/Invoices";
import InvoicesPendingDispatch from "./Components/Invoices/Invoices Table/InvoicesPendingDispatch";
import DetailedInvoice from "./Components/Invoices/Invoice Details/DetailedInvoice";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="organization" element={<Organizations />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clientDetails/:id" element={<ClientDetails />} />
            <Route path = "employee-staffing" element={<EmployeeTable/>}/>
            <Route path="vendors" element={<Vendors />} />
            <Route path="budget" element={<Budget />} />
            <Route path="all-purchase" element={<PurchaseOrders />} />
            <Route path="my-purchase" element={<MyPurchaseOrder />} />
            <Route path="internal-po" element={<InternalPO />} />
            <Route
              path="internal-po-approval-level-1"
              element={<InternalPOL1 />}
            />
            <Route
              path="internal-po-approval-level-2"
              element={<InternalPOL2 />}
            />
            <Route
              path="internal-po-approval-level-all"
              element={<InternalPOAll />}
            />
            <Route path="all-invoices" element={<AllInvoices/>}/>
            <Route path="invoices" element={<Invoices/>}/>
            <Route path="invoices-pending-dispatch" element={<InvoicesPendingDispatch/>}/>
          </Route>
            <Route path="invoice/:id" element={<DetailedInvoice/>}/>
        </Routes>
      </BrowserRouter>

      {/* <BankDetails/> */}
    </div>
  );
}
export default App;
