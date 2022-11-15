import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import InvoiceNavigator from "../InvoiceNavigator/InvoiceNavigator";
import Banner from "./Banner";
import TableRender from "./TableRender";
export const Id = createContext()
const DetailedInvoice = () => {
  const { id } = useParams();
  
  return (
    <>
    <Id.Provider value={id}>
      <div>
        <InvoiceNavigator />
      </div>
      <div>
        <Banner/>
      </div>
      <div className="mt-5">
        <TableRender/>
      </div>
    </Id.Provider>
    </>
  );
};

export default DetailedInvoice;
