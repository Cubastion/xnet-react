import React, { useContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";
const InvoiceItemsTable = () => {
  const id = useContext(Id);
  const [tabelData, setTableData] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoicesItems/findByInvoiceId?id=${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log(json.data);
        setTableData(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return <div>InvoiceItemsTable</div>;
};

export default InvoiceItemsTable;
