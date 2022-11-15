import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import InvoiceNavigator from "../InvoiceNavigator/InvoiceNavigator";
import Banner from "./Banner";
import TableRender from "./TableRender";
const DetailedInvoice = () => {
  const { id } = useParams();
  const [details, setDetails] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoices/findById?id=${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log(json.data)
        setDetails(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <InvoiceNavigator details={details} />
      </div>
      <div>
        <Banner details={details}/>
      </div>
      <div className="mt-5">
        <TableRender/>
      </div>
    </>
  );
};

export default DetailedInvoice;
