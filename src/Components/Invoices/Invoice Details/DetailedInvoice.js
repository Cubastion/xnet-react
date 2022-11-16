import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import InvoiceNavigator from "../InvoiceNavigator/InvoiceNavigator";
import Banner from "./Banner";
import TableRender from "./TableRender";
export const Id = createContext();
export const RefreshAttachmenstData = createContext();
const DetailedInvoice = () => {
  const { id } = useParams();
  const [refresherVariable, setRefresherVariable] = useState(0);
  return (
    <>
      <Id.Provider value={id}>
        <RefreshAttachmenstData.Provider value = {[refresherVariable, setRefresherVariable]}>
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
    </>
  );
};

export default DetailedInvoice;
