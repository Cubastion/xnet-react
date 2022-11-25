import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import InvoiceNavigator from "../InvoiceNavigator/InvoiceNavigator";
import Banner from "./Banner";
import TableRender from "./TableRender";
export const Id = createContext();
export const RefreshAttachmenstData = createContext();
export const POId = createContext();
export const CurrentInvoice = createContext();
const DetailedInvoice = () => {
  const { id } = useParams();
  const [refresherVariable, setRefresherVariable] = useState(0);
  const [selectedPO, setSelectedPO] = useState("");
  const [invoice, setInvoice] = useState("");
  return (
    <>
      <CurrentInvoice.Provider value={[invoice, setInvoice]}>
        <POId.Provider value={[selectedPO, setSelectedPO]}>
          <Id.Provider value={id}>
            <RefreshAttachmenstData.Provider
              value={[refresherVariable, setRefresherVariable]}
            >
              <div>
                <InvoiceNavigator />
              </div>
              <div>
                <Banner />
              </div>
              <div className="mb-4 mt-5">
                <TableRender />
              </div>
            </RefreshAttachmenstData.Provider>
          </Id.Provider>
        </POId.Provider>
      </CurrentInvoice.Provider>
    </>
  );
};

export default DetailedInvoice;
